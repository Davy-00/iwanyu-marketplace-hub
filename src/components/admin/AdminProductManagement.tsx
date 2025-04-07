
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Package, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock product data
const productData = [
  {
    id: '1',
    name: 'Handwoven Basket',
    price: 15000,
    category: 'Home Decor',
    stock: 24,
    seller: 'Rwanda Crafts'
  },
  {
    id: '2',
    name: 'Traditional Coffee Set',
    price: 35000,
    category: 'Kitchen',
    stock: 12,
    seller: 'Kigali Coffee'
  },
  {
    id: '3',
    name: 'Beaded Necklace',
    price: 8000,
    category: 'Jewelry',
    stock: 36, 
    seller: 'Rwandan Styles'
  },
  {
    id: '4',
    name: 'Wooden Sculpture',
    price: 45000,
    category: 'Art',
    stock: 8,
    seller: 'Sweet Rwanda'
  },
  {
    id: '5',
    name: 'Rwandan Tea Collection',
    price: 12000,
    category: 'Food & Drinks',
    stock: 20,
    seller: 'Kigali Coffee'
  }
];

const AdminProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = productData.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Product Management</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all products across the marketplace
          </p>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search products by name, category, or seller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button variant="outline" className="flex gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {product.price.toLocaleString('en-US', { 
                    style: 'currency', 
                    currency: 'RWF',
                    maximumFractionDigits: 0 
                  })}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.seller}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="mr-2">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-iwanyu-gray">
            Showing {filteredProducts.length} of {productData.length} products
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProductManagement;
