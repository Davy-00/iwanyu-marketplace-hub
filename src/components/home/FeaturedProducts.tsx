
import React from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock data for featured products
const mockProducts = [
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
    name: 'Organic Coffee Beans',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e',
    shop: {
      id: '2',
      name: 'Kigali Coffee'
    }
  },
  {
    id: '3',
    name: 'African Print Shirt',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2',
    shop: {
      id: '3',
      name: 'Rwandan Styles'
    }
  },
  {
    id: '4',
    name: 'Natural Honey',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924',
    shop: {
      id: '4',
      name: 'Sweet Rwanda'
    }
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <div className="iwanyu-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products">
            <Button variant="link" className="text-iwanyu-orange hover:text-iwanyu-dark-orange">
              See All Products
            </Button>
          </Link>
        </div>
        <ProductGrid products={mockProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
