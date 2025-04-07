
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, Users, ShoppingBag, DollarSign } from 'lucide-react';

interface AdminStatistics {
  totalSellers: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
}

interface AdminStatisticsCardsProps {
  statistics: AdminStatistics;
}

const AdminStatisticsCards = ({ statistics }: AdminStatisticsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Card 1 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
          <Store className="h-5 w-5 text-iwanyu-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalSellers}</div>
          <p className="text-xs text-muted-foreground">+5 this month</p>
        </CardContent>
      </Card>
      
      {/* Card 2 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-5 w-5 text-iwanyu-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalCustomers}</div>
          <p className="text-xs text-muted-foreground">+32 this month</p>
        </CardContent>
      </Card>
      
      {/* Card 3 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingBag className="h-5 w-5 text-iwanyu-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalOrders}</div>
          <p className="text-xs text-muted-foreground">+85 this month</p>
        </CardContent>
      </Card>
      
      {/* Card 4 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-5 w-5 text-iwanyu-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statistics.totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 })}
          </div>
          <p className="text-xs text-muted-foreground">+22% this month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatisticsCards;
