import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Store, Users, ShoppingBag, DollarSign } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

// Mock data for admin dashboard
const adminData = {
  statistics: {
    totalSellers: 48,
    totalCustomers: 520,
    totalOrders: 1240,
    totalRevenue: 28500000
  },
  sellers: [
    {
      id: '1',
      name: 'Rwanda Crafts',
      owner: 'Marie Uwase',
      products: 24,
      status: 'Active',
      joined: '2025-01-15'
    },
    {
      id: '2',
      name: 'Kigali Coffee',
      owner: 'Jean Pierre',
      products: 12,
      status: 'Active',
      joined: '2025-02-03'
    },
    {
      id: '3',
      name: 'Rwandan Styles',
      owner: 'Grace Mutoni',
      products: 36,
      status: 'Pending',
      joined: '2025-04-01'
    },
    {
      id: '4',
      name: 'Sweet Rwanda',
      owner: 'Patrick Mugisha',
      products: 8,
      status: 'Active',
      joined: '2025-02-22'
    },
  ],
  customers: [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      orders: 8,
      joined: '2025-01-20'
    },
    {
      id: '2',
      name: 'Mary Johnson',
      email: 'mary@example.com',
      orders: 12,
      joined: '2025-02-10'
    },
    {
      id: '3',
      name: 'Robert Brown',
      email: 'robert@example.com',
      orders: 5,
      joined: '2025-03-05'
    }
  ]
};

const AdminDashboard = () => {
  return (
    <MainLayout>
      <div className="iwanyu-container py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
              <Store className="h-5 w-5 text-iwanyu-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminData.statistics.totalSellers}</div>
              <p className="text-xs text-muted-foreground">+5 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-5 w-5 text-iwanyu-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminData.statistics.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">+32 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-5 w-5 text-iwanyu-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminData.statistics.totalOrders}</div>
              <p className="text-xs text-muted-foreground">+85 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-iwanyu-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {adminData.statistics.totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-muted-foreground">+22% this month</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="sellers">
          <TabsList className="mb-6">
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
          </TabsList>
          
          {/* Sellers Tab */}
          <TabsContent value="sellers">
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
                    {adminData.sellers.map((seller) => (
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
          </TabsContent>
          
          {/* Customers Tab */}
          <TabsContent value="customers">
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
                    {adminData.customers.map((customer) => (
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
          </TabsContent>
          
          {/* Other Tabs (placeholder for now) */}
          <TabsContent value="products">
            <Card className="p-6">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">Product Management Coming Soon</h3>
                <p className="text-iwanyu-gray mb-6">Manage all products across the platform from here.</p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card className="p-6">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">Order Management Coming Soon</h3>
                <p className="text-iwanyu-gray mb-6">Track and manage all orders across the platform.</p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="promotions">
            <Card>
              <CardHeader>
                <CardTitle>Manage Homepage Banners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-iwanyu-light-gray p-4 rounded-md mb-6 text-center">
                  <p className="text-lg">Homepage banner management will be added here.</p>
                  <p className="text-sm text-iwanyu-gray mt-2">You'll be able to upload, schedule, and manage promotional banners.</p>
                </div>
                <div className="text-center">
                  <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
                    Add New Banner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
