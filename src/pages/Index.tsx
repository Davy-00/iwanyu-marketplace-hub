
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Banner from '@/components/home/Banner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FeaturedShops from '@/components/home/FeaturedShops';

const Index = () => {
  return (
    <MainLayout showSearch={true}>
      <Banner />
      <FeaturedProducts />
      <FeaturedShops />
    </MainLayout>
  );
};

export default Index;
