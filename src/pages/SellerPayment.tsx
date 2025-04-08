
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { subscriptionPlans } from '@/components/seller/subscription/SubscriptionPlansData';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SellerPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Get the plan ID from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('plan');
  
  // Find the selected plan from our subscription plans data
  const selectedPlan = subscriptionPlans.find(plan => plan.id === planId);
  
  const handlePayment = async () => {
    if (!selectedPlan) return;
    
    setLoading(true);
    
    try {
      // In a real app, this would call your payment processor API
      // For demo purposes, we'll simulate a payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful payment
      setCompleted(true);
      
      toast({
        title: "Payment Successful",
        description: `You have successfully subscribed to the ${selectedPlan.name}.`,
      });
      
      // In a real app, you would update the user's subscription status in your database
      setTimeout(() => {
        navigate('/seller-dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // If no plan is selected, redirect to subscription page
  useEffect(() => {
    if (!planId || !selectedPlan) {
      toast({
        title: "No Plan Selected",
        description: "Please select a subscription plan first.",
      });
      navigate('/seller-subscription');
    }
  }, [planId, selectedPlan, navigate, toast]);
  
  if (!selectedPlan) {
    return null; // Will redirect via the useEffect
  }

  return (
    <MainLayout>
      <div className="container max-w-4xl py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/seller-subscription')}
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Plans
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Complete Your Subscription</h1>
        
        <div className="grid gap-6 md:grid-cols-5">
          {/* Payment details - takes 3 columns */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Complete your payment to activate your subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              {completed ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Payment Successful!</h3>
                  <p className="text-muted-foreground">
                    Your subscription has been activated.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md text-center">
                    <CreditCard className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p>
                      This is a demo payment page. In a real application, you would 
                      integrate with a payment processor like Stripe.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {!completed && (
                <Button 
                  className="w-full bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : `Pay ${selectedPlan.price}`}
                </Button>
              )}
            </CardFooter>
          </Card>
          
          {/* Order summary - takes 2 columns */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">{selectedPlan.name}</span>
                  <span>{selectedPlan.price}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedPlan.period} subscription
                </div>
                
                <ul className="space-y-2 text-sm">
                  {selectedPlan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{selectedPlan.price}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SellerPayment;
