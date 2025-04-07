
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';

// Import extracted components
import ProductForm from '@/components/seller/ProductForm';
import StatisticsCards from '@/components/seller/StatisticsCards';
import ProductsTab from '@/components/seller/ProductsTab';
import OrdersTab from '@/components/seller/OrdersTab';
import BannersTab from '@/components/seller/BannersTab';
import SettingsTab from '@/components/seller/SettingsTab';
import SellerNav from '@/components/seller/SellerNav';

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
        <SellerNav />
        
        {/* Product Form Modal */}
        {showAddProductForm && (
          <ProductForm 
            onSubmit={handleProductFormSubmit}
            onCancel={() => setShowAddProductForm(false)}
          />
        )}
        
        {/* Statistics Cards */}
        <StatisticsCards statistics={dashboardData.statistics} />
        
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
            <ProductsTab 
              products={dashboardData.products}
              onAddProduct={handleAddProduct}
            />
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>
          
          {/* Banners Tab */}
          <TabsContent value="banners">
            <BannersTab />
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SellerDashboard;
