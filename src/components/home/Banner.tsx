
import React from 'react';
import { Button } from '@/components/ui/button';

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-iwanyu-orange to-iwanyu-dark-orange py-16 text-white">
      <div className="iwanyu-container">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Shop Rwanda's Best Local Stores</h1>
          <p className="text-lg mb-8 text-white/90">
            Discover unique products from Rwanda's amazing local shops, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white hover:bg-iwanyu-light-gray text-iwanyu-orange text-lg px-8 py-6">
              Start Shopping
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Open Your Shop
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
