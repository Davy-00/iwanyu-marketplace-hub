
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Circle, CircleDot, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    price: '10,000 RWF',
    period: '/month',
    description: 'Perfect for new sellers.',
    features: [
      'Add up to 10 products',
      'Basic seller dashboard',
      'Email support',
      'Standard delivery support'
    ],
    icon: '🟠',
    buttonText: 'Subscribe Now'
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '20,000 RWF',
    period: '/month',
    description: 'Ideal for growing businesses.',
    features: [
      'Unlimited products',
      'Advanced dashboard & analytics',
      'Priority email support',
      'Homepage feature eligibility',
      'Integrated delivery tracking'
    ],
    icon: '⚪',
    buttonText: 'Upgrade to Pro',
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '35,000 RWF',
    period: '/month',
    description: 'For top sellers who want full visibility & support.',
    features: [
      'Unlimited products',
      'Advanced dashboard & analytics',
      'Featured on homepage banner',
      'Direct support via WhatsApp',
      'Monthly sales report',
      'Premium delivery (fast dispatch + tracking)'
    ],
    icon: '🧡',
    buttonText: 'Go Premium'
  }
];

type FormValues = {
  plan: string;
}

const SellerSubscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<FormValues>({
    defaultValues: {
      plan: 'pro' // Changed default plan to pro
    }
  });

  const handleSubscription = (values: FormValues) => {
    const plan = subscriptionPlans.find(p => p.id === values.plan);
    
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubscription)}>
              <RadioGroup
                defaultValue="starter"
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                {...form.register("plan")}
              >
                {subscriptionPlans.map((plan) => (
                  <FormField
                    key={plan.id}
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Card 
                            className={`relative cursor-pointer border-2 h-full flex flex-col ${
                              field.value === plan.id 
                                ? 'border-iwanyu-orange shadow-lg' 
                                : plan.recommended 
                                  ? 'border-iwanyu-orange/50' 
                                  : 'border-gray-200'
                            }`}
                            onClick={() => form.setValue('plan', plan.id)}
                          >
                            {plan.recommended && (
                              <div className="absolute -top-4 left-0 right-0 text-center">
                                <span className="bg-iwanyu-orange text-white px-4 py-1 rounded-full text-sm font-medium">
                                  Recommended
                                </span>
                              </div>
                            )}
                            <div className="absolute top-4 right-4">
                              {field.value === plan.id ? (
                                <CircleDot className="h-5 w-5 text-iwanyu-orange" />
                              ) : (
                                <Circle className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <CardHeader>
                              <div className="text-2xl mb-2">{plan.icon}</div>
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
                                  <li key={idx} className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                            <CardFooter>
                              <Button 
                                type="submit"
                                onClick={() => form.setValue('plan', plan.id)}
                                className={`w-full ${
                                  plan.id === 'premium' || field.value === plan.id 
                                    ? 'bg-iwanyu-orange hover:bg-iwanyu-dark-orange' 
                                    : ''
                                }`}
                              >
                                {plan.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </RadioGroup>
            </form>
          </Form>
          
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
