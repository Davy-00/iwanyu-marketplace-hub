
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

// Mock cart data
const initialCartItems = [
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

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Navigate to the checkout page
    navigate('/checkout');
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );
  
  const shipping = cartItems.length > 0 ? 2000 : 0;
  const total = subtotal + shipping;

  return (
    <MainLayout>
      <div className="iwanyu-container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {cartItems.map(item => (
                  <CartItem 
                    key={item.id}
                    {...item}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </div>
            </div>
            <div>
              <CartSummary 
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                onCheckout={handleCheckout}
                isLoading={isCheckingOut}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-iwanyu-light-gray mb-6">
              <ShoppingBag className="h-10 w-10 text-iwanyu-gray" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-iwanyu-gray mb-6">Start shopping to add items to your cart.</p>
            <Button 
              className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
              onClick={() => navigate('/')}
            >
              Browse Products
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
