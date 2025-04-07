
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
  sales: number;
}

interface ProductsTabProps {
  products: Product[];
  onAddProduct: () => void;
}

const ProductsTab = ({ products, onAddProduct }: ProductsTabProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Product Management</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Manage all products across the platform from here.</p>
        </div>
        <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange" onClick={onAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {product.price.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}
                </TableCell>
                <TableCell>{product.inventory} in stock</TableCell>
                <TableCell>{product.sales} sold</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="mr-2">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductsTab;
