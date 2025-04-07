
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, DollarSign, ShoppingBag, Users, Plus, Upload, ShoppingCart, Home, User } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Mock data for seller dashboard
const dashboardData = {
  statistics: {
    totalProducts: 24,
    totalSales: 4200000,
    pendingOrders: 7,
    totalCustomers: 148
  },
  recentOrders: [
    {
      id: 'ORDER-001',
      date: '2025-04-01',
      customer: 'John Doe',
      amount: 45000,
      status: 'Delivered'
    },
    {
      id: 'ORDER-002',
      date: '2025-04-03',
      customer: 'Alice Smith',
      amount: 28000,
      status: 'Processing'
    },
    {
      id: 'ORDER-003',
      date: '2025-04-05',
      customer: 'Robert Johnson',
      amount: 60000,
      status: 'Pending'
    }
  ],
  products: [
    {
      id: '1',
      name: 'Handwoven Basket',
      price: 15000,
      inventory: 8,
      sales: 24
    },
    {
      id: '2',
      name: 'Colorful Wall Basket',
      price: 18000,
      inventory: 12,
      sales: 18
    },
    {
      id: '3',
      name: 'Traditional Mask',
      price: 25000,
      inventory: 5,
      sales: 10
    },
    {
      id: '4',
      name: 'Handmade Jewelry',
      price: 12000,
      inventory: 15,
      sales: 32
    }
  ]
};

const SellerDashboard = () => {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const { toast } = useToast();

  // Handler for Add New Product button
  const handleAddProduct = () => {
    setShowAddProductForm(true);
    toast({
      title: "Product Form",
      description: "Product creation form opened.",
    });
  };

  // Mock form submit handler
  const handleProductFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddProductForm(false);
    toast({
      title: "Success",
      description: "Product added successfully!",
      variant: "default",
    });
  };

  return (
    <MainLayout>
      <div className="iwanyu-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange" onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>
        
        {/* Seller Navigation */}
        <div className="mb-8">
          <div className="flex space-x-4 border-b pb-2">
            <Link to="/" className="flex items-center text-iwanyu-gray hover:text-iwanyu-orange transition-colors">
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <Link to="/profile" className="flex items-center text-iwanyu-gray hover:text-iwanyu-orange transition-colors">
              <User className="mr-1 h-4 w-4" />
              Profile
            </Link>
          </div>
        </div>
        
        {/* Product Form Modal */}
        {showAddProductForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductFormSubmit} className="space-y-4">
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
                      onClick={() => setShowAddProductForm(false)}
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
        )}
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-5 w-5 text-iwanyu-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.statistics.totalProducts}</div>
              <p className="text-xs text-muted-foreground">+2 added this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-5 w-5 text-iwanyu-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.statistics.totalSales.toLocaleString('en-US', { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <ShoppingBag className="h-5 w-5 text-iwanyu-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.statistics.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Needs your attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-5 w-5 text-iwanyu-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.statistics.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">+12 new this month</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="banners">Banners</TabsTrigger>
            <TabsTrigger value="settings">Store Settings</TabsTrigger>
          </TabsList>
          
          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Product Management</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Manage all products across the platform from here.</p>
                </div>
                <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange" onClick={handleAddProduct}>
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
                    {dashboardData.products.map((product) => (
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
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management Coming Soon</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Track and manage all orders across the platform.</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 bg-gray-50 rounded-md">
                  <ShoppingCart className="mx-auto h-12 w-12 text-iwanyu-gray opacity-50 mb-2" />
                  <h3 className="text-xl font-medium text-iwanyu-dark-gray mb-2">Order Management Coming Soon</h3>
                  <p className="text-iwanyu-gray max-w-md mx-auto">
                    You'll be able to track orders, update status, and manage deliveries all from this interface.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Banners Tab */}
          <TabsContent value="banners">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manage Homepage Banners</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Homepage banner management will be added here.
                  </p>
                </div>
                <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Banner
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 bg-gray-50 rounded-md">
                  <Upload className="mx-auto h-12 w-12 text-iwanyu-gray opacity-50 mb-2" />
                  <h3 className="text-xl font-medium text-iwanyu-dark-gray mb-2">Banner Management Coming Soon</h3>
                  <p className="text-iwanyu-gray max-w-md mx-auto">
                    You'll be able to upload, schedule, and manage promotional banners for your store.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-6">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">Store Settings Coming Soon</h3>
                <p className="text-iwanyu-gray mb-6">You'll be able to customize your store profile and settings here.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SellerDashboard;
