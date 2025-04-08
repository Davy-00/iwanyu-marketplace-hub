
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { subscriptionPlans } from '@/components/seller/subscription/SubscriptionPlansData';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Irembo Pay configuration
const IREMBO_PAY_API_URL = 'https://api.irembo.gov.rw/payments/v1/create-payment';
const IREMBO_PAY_REDIRECT_URL = window.location.origin + '/payment-success';
const IREMBO_PAY_CALLBACK_URL = window.location.origin + '/api/irembo-callback';

interface PaymentStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  message?: string;
}

interface IremboPayResponse {
  paymentUrl: string;
  referenceId: string;
}

const SellerPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ status: 'pending' });
  const [paymentReference, setPaymentReference] = useState('');
  const [user, setUser] = useState<any>(null);
  const [showIremboDialog, setShowIremboDialog] = useState(false);
  const [iremboPayUrl, setIremboPayUrl] = useState('');
  
  // Get the plan ID from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('plan');
  
  // Find the selected plan from our subscription plans data
  const selectedPlan = subscriptionPlans.find(plan => plan.id === planId);

  // Get current authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to continue with your subscription",
          variant: "destructive",
        });
        navigate('/auth');
      }
    };
    fetchUser();
  }, [navigate, toast]);
  
  // Generate a unique payment reference
  useEffect(() => {
    if (!paymentReference && selectedPlan) {
      const generatedRef = `IWP-${selectedPlan.id.toUpperCase()}-${Date.now().toString().slice(-6)}`;
      setPaymentReference(generatedRef);
    }
  }, [selectedPlan, paymentReference]);

  // Check payment status
  const checkPaymentStatus = async (reference: string) => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('status')
        .eq('reference', reference)
        .single();
        
      if (error) throw error;
      
      if (data.status === 'completed') {
        setCompleted(true);
        setPaymentStatus({ status: 'completed' });
        toast({
          title: "Payment Successful",
          description: `You have successfully subscribed to the ${selectedPlan?.name}.`,
        });
        
        // Redirect to seller dashboard after successful payment
        setTimeout(() => {
          navigate('/seller-dashboard');
        }, 2000);
      } else if (data.status === 'failed') {
        setPaymentStatus({ status: 'failed', message: 'Payment failed. Please try again.' });
        toast({
          title: "Payment Failed",
          description: "Your payment could not be processed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };
  
  // Create payment record in the database
  const createPaymentRecord = async () => {
    if (!selectedPlan || !user) return null;
    
    try {
      const { data, error } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          reference: paymentReference,
          amount: selectedPlan.priceValue || 0,
          currency: 'RWF',
          plan_id: selectedPlan.id,
          status: 'pending'
        })
        .select();
        
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error creating payment record:', error);
      return null;
    }
  };

  // Simulate Irembo Pay integration (in a real implementation, this would call the Irembo Pay API)
  const initiateIremboPayment = async () => {
    if (!selectedPlan || !user) {
      toast({
        title: "Error",
        description: !user ? "Please login to continue" : "No plan selected",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setPaymentStatus({ status: 'processing' });
    
    try {
      // Create payment record in database
      const paymentRecord = await createPaymentRecord();
      if (!paymentRecord) {
        throw new Error('Failed to create payment record');
      }
      
      // In a real implementation, call the Irembo Pay API
      // For now, we'll simulate the response with a timeout
      // This would be replaced with an actual API call in production
      /*
      const response = await fetch(IREMBO_PAY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPlan.priceValue,
          currency: 'RWF',
          description: `Subscription to ${selectedPlan.name} Plan`,
          reference: paymentReference,
          returnUrl: IREMBO_PAY_REDIRECT_URL,
          callbackUrl: IREMBO_PAY_CALLBACK_URL,
        }),
      });
      
      const data = await response.json();
      */
      
      // Simulate API response
      setTimeout(() => {
        // This URL would come from the actual Irembo Pay API
        const simulatedPaymentUrl = `https://pay.irembo.gov.rw/payments/${paymentReference}`;
        setIremboPayUrl(simulatedPaymentUrl);
        setShowIremboDialog(true);
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus({ status: 'failed', message: 'Failed to initiate payment' });
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };
  
  // Simulate payment completion (this would normally be called after user is redirected back from Irembo Pay)
  const simulatePaymentCompletion = async () => {
    setShowIremboDialog(false);
    setLoading(true);
    
    try {
      // Update the payment status to completed
      const { error: updateError } = await supabase
        .from('payments')
        .update({ status: 'completed' })
        .eq('reference', paymentReference);
        
      if (updateError) throw updateError;
      
      // Create a subscription record
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan_id: selectedPlan?.id,
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          status: 'active',
          payment_reference: paymentReference
        });
        
      if (subscriptionError) throw subscriptionError;
      
      setCompleted(true);
      setPaymentStatus({ status: 'completed' });
      
      toast({
        title: "Payment Successful",
        description: `You have successfully subscribed to the ${selectedPlan?.name}.`,
      });
      
      // Redirect to seller dashboard after successful payment
      setTimeout(() => {
        navigate('/seller-dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error completing payment:', error);
      setPaymentStatus({ status: 'failed', message: 'Failed to complete payment' });
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
                  <p className="text-muted-foreground mb-2">
                    Your subscription has been activated.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Reference: {paymentReference}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-medium">Irembo Pay</h4>
                        <p className="text-sm text-muted-foreground">Secure payment processed by Irembo Pay</p>
                      </div>
                      <div className="h-8 w-12 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        IREMBO
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Payment Reference</span>
                        <span className="font-medium">{paymentReference}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount</span>
                        <span className="font-medium">{selectedPlan.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-center text-muted-foreground">
                    By clicking "Pay Now", you will be redirected to Irembo Pay to complete your payment.
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {!completed && (
                <Button 
                  className="w-full bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
                  onClick={initiateIremboPayment}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : `Pay Now with Irembo Pay`}
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
        
        {/* Irembo Pay Dialog */}
        <Dialog open={showIremboDialog} onOpenChange={setShowIremboDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Irembo Pay Checkout</DialogTitle>
              <DialogDescription>
                You are being redirected to Irembo Pay to complete your payment.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 border rounded-md bg-gray-50">
              <div className="text-center">
                <p className="mb-4">
                  You will be redirected to Irembo Pay to complete your payment of <strong>{selectedPlan.price}</strong> for <strong>{selectedPlan.name}</strong> subscription.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Reference: {paymentReference}
                </p>
                {/* In a real implementation, this would redirect to the Irembo Pay URL */}
                <Button 
                  onClick={simulatePaymentCompletion} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowIremboDialog(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default SellerPayment;
