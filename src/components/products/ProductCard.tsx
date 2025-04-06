
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import StarRating from './StarRating';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  shop: {
    id: string;
    name: string;
  };
  rating?: number;
}

const ProductCard = ({ id, name, price, image, shop, rating = 0 }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart functionality will be implemented later
    toast({
      title: "Added to cart",
      description: `${name} added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden group relative">
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton
          productId={id}
          productName={name}
          variant="icon"
          className="bg-white rounded-full p-1 shadow-sm"
        />
      </div>
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="pt-4">
        <div className="flex justify-between">
          <div>
            <Link to={`/product/${id}`} className="font-medium text-iwanyu-dark-gray hover:text-iwanyu-orange transition-colors">
              {name}
            </Link>
            <Link to={`/shop/${shop.id}`} className="block text-sm text-iwanyu-gray mt-1 hover:text-iwanyu-orange transition-colors">
              {shop.name}
            </Link>
            {rating > 0 && <StarRating rating={rating} className="mt-1" />}
          </div>
          <div className="text-iwanyu-orange font-semibold">
            {price.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-iwanyu-orange hover:bg-iwanyu-dark-orange text-white gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
