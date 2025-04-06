
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  shop: {
    id: string;
    name: string;
  };
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem = ({
  id, 
  name, 
  price, 
  quantity, 
  image, 
  shop, 
  onRemove, 
  onUpdateQuantity
}: CartItemProps) => {
  return (
    <div className="flex flex-col sm:flex-row py-4 border-b last:border-b-0">
      {/* Product image */}
      <div className="w-full sm:w-32 h-32 rounded overflow-hidden mb-4 sm:mb-0 flex-shrink-0">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* Product details */}
      <div className="flex-grow sm:ml-4 space-y-1">
        <Link to={`/product/${id}`} className="font-medium text-lg hover:text-iwanyu-orange transition-colors">
          {name}
        </Link>
        <div>
          <Link to={`/shop/${shop.id}`} className="text-sm text-iwanyu-gray hover:text-iwanyu-orange transition-colors">
            {shop.name}
          </Link>
        </div>
        <div className="font-semibold text-iwanyu-orange">
          {price.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => quantity > 1 && onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0) {
                onUpdateQuantity(id, value);
              }
            }}
            className="w-12 h-8 text-center border-0 p-0"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2 text-iwanyu-gray hover:text-red-500"
          onClick={() => onRemove(id)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
