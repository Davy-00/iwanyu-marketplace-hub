
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, DollarSign, ShoppingBag, Users, Plus } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

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
  return (
    <MainLayout>
      <div className="iwanyu-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>
        
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
        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Store Settings</TabsTrigger>
          </TabsList>
          
          {/* Recent Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardData.recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>
                          {order.amount.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}
                        </TableCell>
                        <TableCell>
                          <div className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Product Inventory</CardTitle>
                <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
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
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="p-6">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-iwanyu-gray mb-6">Detailed sales reports and customer insights will be available here.</p>
              </div>
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
