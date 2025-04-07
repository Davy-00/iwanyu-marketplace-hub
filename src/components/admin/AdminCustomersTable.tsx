
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  joined: string;
}

interface AdminCustomersTableProps {
  customers: Customer[];
}

const AdminCustomersTable = ({ customers }: AdminCustomersTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>{customer.joined}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="mr-2">View</Button>
                  <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50">
                    Block
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminCustomersTable;
