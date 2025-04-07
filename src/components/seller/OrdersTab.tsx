
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

const OrdersTab = () => {
  return (
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
  );
};

export default OrdersTab;
