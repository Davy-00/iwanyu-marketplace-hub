
import React from 'react';

const SubscriptionBenefits: React.FC = () => {
  return (
    <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold mb-4">Why Sell on Iwanyu?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <div className="p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Reach More Customers</h3>
          <p className="text-iwanyu-gray">Access our growing customer base across Rwanda and beyond.</p>
        </div>
        <div className="p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
          <p className="text-iwanyu-gray">Our platform is designed to make selling simple and efficient.</p>
        </div>
        <div className="p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">Grow Your Brand</h3>
          <p className="text-iwanyu-gray">Build your brand with our marketing tools and analytics.</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBenefits;
