
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/layouts/MainLayout';
import { subscriptionPlans } from '@/components/seller/subscription/SubscriptionPlansData';
import SubscriptionForm from '@/components/seller/subscription/SubscriptionForm';
import SubscriptionBenefits from '@/components/seller/subscription/SubscriptionBenefits';
import SubscriptionFAQ from '@/components/seller/subscription/SubscriptionFAQ';

const SellerSubscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubscription = (selectedPlan: string) => {
    const plan = subscriptionPlans.find(p => p.id === selectedPlan);
    
    // Mock subscription process
    toast({
      title: "Subscription Selected",
      description: `You've selected the ${plan?.name}. Redirecting to dashboard.`,
    });
    
    // In a real implementation, this would handle payment and subscription setup
    setTimeout(() => {
      navigate('/seller-dashboard');
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="iwanyu-container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Become a Seller on Iwanyu</h1>
            <p className="text-lg text-iwanyu-gray max-w-2xl mx-auto">
              Choose the plan that best suits your business needs and start selling your products to customers across Rwanda.
            </p>
          </div>

          <SubscriptionForm onSubscribe={handleSubscription} />
          
          <SubscriptionBenefits />
          
          <SubscriptionFAQ />
        </div>
      </div>
    </MainLayout>
  );
};

export default SellerSubscription;
