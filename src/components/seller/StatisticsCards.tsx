
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Package, DollarSign, ShoppingBag, Users } from 'lucide-react';

interface StatisticsData {
  totalProducts: number;
  totalSales: number;
  pendingOrders: number;
  totalCustomers: number;
}

interface StatisticsCardsProps {
  statistics: StatisticsData;
}

const StatisticsCards = ({ statistics }: StatisticsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-5 w-5 text-iwanyu-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalProducts}</div>
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
            {statistics.totalSales.toLocaleString('en-US', { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 })}
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
          <div className="text-2xl font-bold">{statistics.pendingOrders}</div>
          <p className="text-xs text-muted-foreground">Needs your attention</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Customers</CardTitle>
          <Users className="h-5 w-5 text-iwanyu-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalCustomers}</div>
          <p className="text-xs text-muted-foreground">+12 new this month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;
