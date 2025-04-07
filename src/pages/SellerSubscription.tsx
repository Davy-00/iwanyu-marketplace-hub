
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SubscriptionForm from '@/components/seller/subscription/SubscriptionForm';
import SubscriptionBenefits from '@/components/seller/subscription/SubscriptionBenefits';
import SubscriptionFAQ from '@/components/seller/subscription/SubscriptionFAQ';
import { toast } from '@/hooks/use-toast';

const SellerSubscription = () => {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState<string>('starter');
  
  const handleSubscribe = (plan: string) => {
    setCurrentPlan(plan);
    
    // In a real app, this would call an API to update the subscription
    setTimeout(() => {
      navigate('/seller-dashboard');
    }, 1500);
  };
  
  return (
    <MainLayout>
      <div className="container max-w-6xl py-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/seller-dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Seller Plan</h1>
          <p className="text-iwanyu-gray">
            Select the subscription plan that best fits your business needs.
          </p>
        </div>
        
        {/* Subscription Plans */}
        <div className="mb-12">
          <SubscriptionForm onSubscribe={handleSubscribe} />
        </div>
        
        {/* Benefits */}
        <SubscriptionBenefits />
        
        {/* FAQs */}
        <SubscriptionFAQ />
      </div>
    </MainLayout>
  );
};

export default SellerSubscription;
