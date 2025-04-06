
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface WishlistButtonProps {
  productId: string;
  productName: string;
  variant?: 'default' | 'outline' | 'icon';
  className?: string;
}

const WishlistButton = ({ 
  productId, 
  productName,
  variant = 'default',
  className = ''
}: WishlistButtonProps) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const toggleWishlist = () => {
    // In a real app, this would be an API call to add/remove from wishlist
    setIsInWishlist(!isInWishlist);
    
    toast({
      title: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      description: `${productName} has been ${isInWishlist ? 'removed from' : 'added to'} your wishlist`,
    });
  };

  if (variant === 'icon') {
    return (
      <Heart 
        className={`cursor-pointer transition-colors ${
          isInWishlist ? 'fill-iwanyu-orange text-iwanyu-orange' : 'text-iwanyu-gray hover:text-iwanyu-orange'
        } ${className}`}
        onClick={toggleWishlist}
      />
    );
  }

  return (
    <Button 
      variant={variant}
      onClick={toggleWishlist}
      className={className}
    >
      <Heart className={`mr-2 h-5 w-5 ${isInWishlist ? 'fill-iwanyu-orange' : ''}`} />
      {isInWishlist ? 'Saved' : 'Save'}
    </Button>
  );
};

export default WishlistButton;
