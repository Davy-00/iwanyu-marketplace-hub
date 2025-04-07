
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Filter, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock order data
const orderData = [
  {
    id: 'ORD-001',
    date: '2025-04-05',
    customer: 'John Smith',
    total: 65000,
    status: 'Delivered',
    payment: 'Completed'
  },
  {
    id: 'ORD-002',
    date: '2025-04-04',
    customer: 'Mary Johnson',
    total: 32000,
    status: 'Processing',
    payment: 'Completed'
  },
  {
    id: 'ORD-003',
    date: '2025-04-03',
    customer: 'Robert Brown',
    total: 48500,
    status: 'Shipped',
    payment: 'Completed'
  },
  {
    id: 'ORD-004',
    date: '2025-04-03',
    customer: 'Alice Williams',
    total: 28000,
    status: 'Processing',
    payment: 'Pending'
  },
  {
    id: 'ORD-005',
    date: '2025-04-02',
    customer: 'David Miller',
    total: 76000,
    status: 'Delivered',
    payment: 'Completed'
  }
];

const AdminOrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOrders = orderData.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Order Management</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage all customer orders
          </p>
        </div>
        <Button className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange flex gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by order ID, customer name, or status..."
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
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  {order.total.toLocaleString('en-US', { 
                    style: 'currency', 
                    currency: 'RWF',
                    maximumFractionDigits: 0 
                  })}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPaymentColor(order.payment)}`}>
                    {order.payment}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-iwanyu-gray">
            Showing {filteredOrders.length} of {orderData.length} orders
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

export default AdminOrderManagement;
