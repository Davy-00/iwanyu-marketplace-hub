
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/MainLayout';
import AdminStatisticsCards from '@/components/admin/AdminStatisticsCards';
import AdminSellersTable from '@/components/admin/AdminSellersTable';
import AdminCustomersTable from '@/components/admin/AdminCustomersTable';
import AdminProductManagement from '@/components/admin/AdminProductManagement';
import AdminOrderManagement from '@/components/admin/AdminOrderManagement';
import AdminPromotionsTab from '@/components/admin/AdminPromotionsTab';
import { adminData } from '@/components/admin/AdminDashboardData';

const AdminDashboard = () => {
  return (
    <MainLayout>
      <div className="iwanyu-container py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Statistics Cards */}
        <AdminStatisticsCards statistics={adminData.statistics} />
        
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
            <AdminSellersTable sellers={adminData.sellers} />
          </TabsContent>
          
          {/* Customers Tab */}
          <TabsContent value="customers">
            <AdminCustomersTable customers={adminData.customers} />
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products">
            <AdminProductManagement />
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <AdminOrderManagement />
          </TabsContent>
          
          {/* Promotions Tab */}
          <TabsContent value="promotions">
            <AdminPromotionsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
