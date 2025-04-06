
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data for featured shops
const mockShops = [
  {
    id: '1',
    name: 'Rwanda Crafts',
    description: 'Traditional handmade Rwandan crafts and baskets',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d',
    productCount: 24
  },
  {
    id: '2',
    name: 'Kigali Coffee',
    description: 'Premium coffee beans from Rwanda\'s finest plantations',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8',
    productCount: 12
  },
  {
    id: '3',
    name: 'Rwandan Styles',
    description: 'Modern African fashion with a Rwandan touch',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f',
    productCount: 36
  }
];

const FeaturedShops = () => {
  return (
    <section className="py-12 bg-iwanyu-light-gray">
      <div className="iwanyu-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Popular Shops</h2>
          <Link to="/shops">
            <Button variant="link" className="text-iwanyu-orange hover:text-iwanyu-dark-orange">
              Browse All Shops
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockShops.map((shop) => (
            <Card key={shop.id} className="overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={shop.image}
                  alt={shop.name}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="pt-6">
                <Link to={`/shop/${shop.id}`} className="block">
                  <h3 className="text-xl font-semibold text-iwanyu-dark-gray hover:text-iwanyu-orange transition-colors">
                    {shop.name}
                  </h3>
                </Link>
                <p className="text-iwanyu-gray mt-2">{shop.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-iwanyu-gray">{shop.productCount} Products</span>
                  <Link to={`/shop/${shop.id}`}>
                    <Button variant="outline" className="border-iwanyu-orange text-iwanyu-orange hover:bg-iwanyu-orange hover:text-white">
                      Visit Shop
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShops;
