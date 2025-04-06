
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic Seller',
    price: 'Free',
    description: 'Get started with a basic shop on our platform',
    features: [
      'List up to 10 products',
      'Basic shop analytics',
      'Standard transaction fees (5%)',
      'Email support'
    ],
    limitations: [
      'No featured products',
      'No promotional tools'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Seller',
    price: '15,000 RWF',
    period: '/month',
    description: 'Everything you need to grow your business',
    features: [
      'Unlimited products',
      'Advanced shop analytics',
      'Reduced transaction fees (3%)',
      'Featured in promotions',
      'Priority support',
      'Shop customization options'
    ],
    limitations: [],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '40,000 RWF',
    period: '/month',
    description: 'For established businesses with high volume',
    features: [
      'Unlimited products',
      'Complete analytics suite',
      'Lowest transaction fees (2%)',
      'Premium shop placement',
      'Dedicated account manager',
      'API access',
      'Custom integrations'
    ],
    limitations: []
  }
];

const SellerSubscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscription = (planId: string) => {
    // Mock subscription process
    toast({
      title: "Subscription Selected",
      description: `You've selected the ${planId} plan. Redirecting to dashboard.`,
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className={`flex flex-col ${plan.recommended ? 'border-iwanyu-orange shadow-lg relative' : ''}`}>
                {plan.recommended && (
                  <div className="absolute -top-4 left-0 right-0 text-center">
                    <span className="bg-iwanyu-orange text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-sm text-iwanyu-gray">{plan.period}</span>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start text-iwanyu-gray">
                        <AlertCircle className="h-5 w-5 text-iwanyu-gray mr-2 shrink-0" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSubscription(plan.id)}
                    className={`w-full ${plan.recommended ? 'bg-iwanyu-orange hover:bg-iwanyu-dark-orange' : ''}`}
                  >
                    Select Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
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

          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">How do I get paid?</h3>
                <p className="text-iwanyu-gray">Payments are processed weekly and transferred directly to your bank account or mobile money.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Can I upgrade or downgrade my plan later?</h3>
                <p className="text-iwanyu-gray">Yes, you can change your subscription plan at any time from your seller dashboard.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">What happens if I need help?</h3>
                <p className="text-iwanyu-gray">Our support team is available via email and chat to help with any questions or issues.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SellerSubscription;
