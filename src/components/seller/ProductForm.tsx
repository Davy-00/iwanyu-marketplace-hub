
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ProductForm = ({ onSubmit, onCancel }: ProductFormProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="productName" className="text-sm font-medium">Product Name</label>
                <input 
                  id="productName"
                  type="text" 
                  required
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter product name"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="productPrice" className="text-sm font-medium">Price (RWF)</label>
                <input 
                  id="productPrice"
                  type="number" 
                  required
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter price"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="productInventory" className="text-sm font-medium">Inventory</label>
                <input 
                  id="productInventory"
                  type="number" 
                  required
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter inventory amount"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="productDescription" className="text-sm font-medium">Description</label>
                <textarea 
                  id="productDescription"
                  rows={3}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter product description"
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Product Image</label>
                <div className="flex items-center gap-2 p-2 border border-dashed rounded-md">
                  <Upload className="h-5 w-5 text-iwanyu-gray" />
                  <span className="text-sm text-iwanyu-gray">Upload Image (Coming Soon)</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
                type="submit"
              >
                Save Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
