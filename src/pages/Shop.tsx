
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock shop data
const shopData = {
  id: '1',
  name: 'Rwanda Crafts',
  description: 'We specialize in traditional handmade Rwandan crafts and baskets. All our products are made by local artisans using traditional techniques passed down through generations.',
  banner: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d',
  logo: 'https://images.unsplash.com/photo-1533323905636-7f0beb92434f',
  location: 'Kigali, Rwanda',
  products: [
    {
      id: '1',
      name: 'Handwoven Basket',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1622467827417-bbe6d313a9f5',
      shop: {
        id: '1',
        name: 'Rwanda Crafts'
      }
    },
    {
      id: '2',
      name: 'Colorful Wall Basket',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1532301271423-751c03fff13c',
      shop: {
        id: '1',
        name: 'Rwanda Crafts'
      }
    },
    {
      id: '3',
      name: 'Traditional Mask',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1560125656-34a3ffc98e86',
      shop: {
        id: '1',
        name: 'Rwanda Crafts'
      }
    },
    {
      id: '4',
      name: 'Handmade Jewelry',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584',
      shop: {
        id: '1',
        name: 'Rwanda Crafts'
      }
    }
  ]
};

const Shop = () => {
  const { id } = useParams();
  // In a real app, we'd fetch the shop data using the ID
  
  return (
    <MainLayout>
      {/* Shop Banner */}
      <div 
        className="h-64 bg-center bg-cover" 
        style={{ backgroundImage: `url(${shopData.banner})` }}
      >
        <div className="iwanyu-container h-full flex items-end">
          <div className="bg-white rounded-t-lg p-4 -mb-16 shadow-md flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
              <img 
                src={shopData.logo} 
                alt={shopData.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{shopData.name}</h1>
              <p className="text-iwanyu-gray">{shopData.location}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shop Content */}
      <div className="iwanyu-container py-24">
        <Tabs defaultValue="all" className="mb-10">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="new">New Arrivals</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ProductGrid products={shopData.products} />
          </TabsContent>
          <TabsContent value="new">
            <ProductGrid products={shopData.products.slice(0, 2)} />
          </TabsContent>
          <TabsContent value="popular">
            <ProductGrid products={shopData.products.slice(2, 4)} />
          </TabsContent>
        </Tabs>
        
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">About {shopData.name}</h2>
          <p className="text-iwanyu-gray">{shopData.description}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Shop;
