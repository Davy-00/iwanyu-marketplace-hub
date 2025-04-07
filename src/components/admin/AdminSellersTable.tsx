
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Seller {
  id: string;
  name: string;
  owner: string;
  products: number;
  status: string;
  joined: string;
}

interface AdminSellersTableProps {
  sellers: Seller[];
}

const AdminSellersTable = ({ sellers }: AdminSellersTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Sellers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellers.map((seller) => (
              <TableRow key={seller.id}>
                <TableCell>{seller.name}</TableCell>
                <TableCell>{seller.owner}</TableCell>
                <TableCell>{seller.products}</TableCell>
                <TableCell>
                  <div className={`inline-block px-2 py-1 text-xs rounded-full ${
                    seller.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {seller.status}
                  </div>
                </TableCell>
                <TableCell>{seller.joined}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="mr-2">View</Button>
                  {seller.status === 'Pending' ? (
                    <Button variant="outline" size="sm" className="mr-2 border-green-500 text-green-500 hover:bg-green-50">
                      Approve
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="mr-2 border-red-500 text-red-500 hover:bg-red-50">
                      Block
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminSellersTable;
