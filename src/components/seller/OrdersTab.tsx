
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // In a real app, we'd filter by the authenticated seller's ID
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: "Error",
          description: "Failed to load orders",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [toast]);
  
  // Status badge color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-500';
      case 'Delivered': return 'bg-green-500';
      case 'Pending': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Track and manage orders for your products.</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-6">
            <Clock className="animate-spin h-6 w-6 mx-auto text-iwanyu-orange mb-2" />
            <p>Loading orders...</p>
          </div>
        ) : orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.total.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-md">
            <Package className="mx-auto h-12 w-12 text-iwanyu-gray opacity-50 mb-2" />
            <h3 className="text-xl font-medium text-iwanyu-dark-gray mb-2">No Orders Yet</h3>
            <p className="text-iwanyu-gray max-w-md mx-auto">
              When customers purchase your products, their orders will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
