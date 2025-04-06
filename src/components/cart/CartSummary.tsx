
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout?: () => void;
  isLoading?: boolean;
}

const CartSummary = ({ 
  subtotal, 
  shipping, 
  total, 
  onCheckout, 
  isLoading = false 
}: CartSummaryProps) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-iwanyu-gray">Subtotal</span>
          <span>{subtotal.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-iwanyu-gray">Shipping</span>
          <span>{shipping.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="text-iwanyu-orange">{total.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
          onClick={handleCheckout}
          disabled={isLoading || total <= 0}
        >
          {isLoading ? "Processing..." : "Proceed to Checkout"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
