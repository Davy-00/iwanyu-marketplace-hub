
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  MapPin, 
  Truck, 
  Check,
  ArrowLeft
} from 'lucide-react';

// Mock checkout data with same cart items from Cart.tsx
const checkoutItems = [
  {
    id: '1',
    name: 'Handwoven Basket',
    price: 15000,
    quantity: 1,
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
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e',
    shop: {
      id: '2',
      name: 'Kigali Coffee'
    }
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Calculate totals (same calculation as in CartSummary)
  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );
  const shipping = checkoutItems.length > 0 ? 2000 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate shipping form
      if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.city || 
          !shippingInfo.phoneNumber || !shippingInfo.email) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed.",
      });
      // Redirect to a thank you page or back to home
      navigate('/');
    }, 2000);
  };

  const renderOrderSummary = () => (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        {checkoutItems.map(item => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">
              {(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}
            </p>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span>{subtotal.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span>{shipping.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="text-iwanyu-orange">{total.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}</span>
        </div>
      </div>
    </div>
  );

  const renderShippingForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            name="fullName" 
            value={shippingInfo.fullName} 
            onChange={handleInputChange}
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={shippingInfo.email} 
            onChange={handleInputChange}
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Street Address</Label>
        <Input 
          id="address" 
          name="address" 
          value={shippingInfo.address} 
          onChange={handleInputChange}
          placeholder="123 Main St"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input 
            id="city" 
            name="city" 
            value={shippingInfo.city} 
            onChange={handleInputChange}
            placeholder="Kigali"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input 
            id="phoneNumber" 
            name="phoneNumber" 
            value={shippingInfo.phoneNumber} 
            onChange={handleInputChange}
            placeholder="+250 78 123 4567"
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center p-4 border rounded-md bg-white cursor-pointer" 
             onClick={() => setPaymentMethod('card')}>
          <input 
            type="radio" 
            id="card" 
            name="paymentMethod" 
            checked={paymentMethod === 'card'} 
            onChange={() => setPaymentMethod('card')} 
            className="mr-3"
          />
          <CreditCard className="h-5 w-5 mr-2 text-iwanyu-gray" />
          <Label htmlFor="card" className="cursor-pointer">Credit/Debit Card</Label>
        </div>
        
        <div className="flex items-center p-4 border rounded-md bg-white cursor-pointer"
             onClick={() => setPaymentMethod('mobile')}>
          <input 
            type="radio" 
            id="mobile" 
            name="paymentMethod" 
            checked={paymentMethod === 'mobile'} 
            onChange={() => setPaymentMethod('mobile')} 
            className="mr-3"
          />
          <div className="h-5 w-5 mr-2 flex items-center justify-center">📱</div>
          <Label htmlFor="mobile" className="cursor-pointer">Mobile Money</Label>
        </div>
        
        <div className="flex items-center p-4 border rounded-md bg-white cursor-pointer"
             onClick={() => setPaymentMethod('cash')}>
          <input 
            type="radio" 
            id="cash" 
            name="paymentMethod" 
            checked={paymentMethod === 'cash'} 
            onChange={() => setPaymentMethod('cash')} 
            className="mr-3"
          />
          <div className="h-5 w-5 mr-2 flex items-center justify-center">💵</div>
          <Label htmlFor="cash" className="cursor-pointer">Cash on Delivery</Label>
        </div>
      </div>
      
      {paymentMethod === 'card' && (
        <div className="p-4 border rounded-md bg-white space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiration Date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" />
            </div>
          </div>
        </div>
      )}
      
      {paymentMethod === 'mobile' && (
        <div className="p-4 border rounded-md bg-white space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input id="mobileNumber" placeholder="+250 78 123 4567" />
          </div>
        </div>
      )}
    </div>
  );

  const renderOrderConfirmation = () => (
    <div className="space-y-6">
      <div className="p-6 bg-green-50 border border-green-100 rounded-md text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Order Review</h3>
        <p className="text-gray-600">Please review your order before confirming.</p>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-md bg-white">
          <h4 className="font-medium flex items-center mb-2">
            <MapPin className="h-4 w-4 mr-2" /> Shipping Information
          </h4>
          <p>{shippingInfo.fullName}</p>
          <p>{shippingInfo.address}</p>
          <p>{shippingInfo.city}</p>
          <p>{shippingInfo.phoneNumber}</p>
          <p>{shippingInfo.email}</p>
        </div>
        
        <div className="p-4 border rounded-md bg-white">
          <h4 className="font-medium flex items-center mb-2">
            <CreditCard className="h-4 w-4 mr-2" /> Payment Method
          </h4>
          <p>{paymentMethod === 'card' ? 'Credit/Debit Card' : 
              paymentMethod === 'mobile' ? 'Mobile Money' : 'Cash on Delivery'}</p>
        </div>
        
        <div className="p-4 border rounded-md bg-white">
          <h4 className="font-medium flex items-center mb-2">
            <Truck className="h-4 w-4 mr-2" /> Delivery
          </h4>
          <p>Standard Delivery - 2-4 business days</p>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderShippingForm();
      case 2:
        return renderPaymentForm();
      case 3:
        return renderOrderConfirmation();
      default:
        return null;
    }
  };

  const renderStepButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <Button 
            variant="outline"
            onClick={handlePrevStep}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        
        {currentStep < 3 ? (
          <Button 
            onClick={handleNextStep} 
            className="ml-auto bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
          >
            {currentStep === 1 ? "Continue to Payment" : "Review Order"}
          </Button>
        ) : (
          <Button 
            onClick={handlePlaceOrder} 
            disabled={isProcessing}
            className="ml-auto bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </Button>
        )}
      </div>
    );
  };

  const steps = [
    { id: 1, name: "Shipping" },
    { id: 2, name: "Payment" },
    { id: 3, name: "Review" },
  ];

  return (
    <MainLayout>
      <div className="iwanyu-container py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {/* Checkout steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex flex-col items-center ${currentStep === step.id ? 'text-iwanyu-orange' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === step.id ? 'bg-iwanyu-orange text-white' : currentStep > step.id ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                  </div>
                  <div className="text-sm mt-1">{step.name}</div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-24 h-1 mx-2 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main checkout form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderStepContent()}
              {renderStepButtons()}
            </div>
          </div>
          
          {/* Order summary */}
          <div>
            {renderOrderSummary()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
