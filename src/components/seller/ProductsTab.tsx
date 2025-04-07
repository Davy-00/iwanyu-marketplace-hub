
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
  const handleEdit = (productId: string) => {
    // Will be implemented in future
    toast({
      title: "Edit Product",
      description: "Product editing will be available soon.",
    });
  };
  
  const handleDelete = (productId: string) => {
    // Will be implemented in future
    toast({
      title: "Delete Product",
      description: "Product deletion will be available soon.",
    });
  };
  
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
        {products.length > 0 ? (
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mr-2"
                      onClick={() => handleEdit(product.id)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-md">
            <p className="text-iwanyu-gray mb-4">No products available yet</p>
            <Button 
              className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange" 
              onClick={onAddProduct}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Product
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductsTab;
