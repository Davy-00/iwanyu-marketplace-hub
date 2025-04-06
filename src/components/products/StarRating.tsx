
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = 16,
  className = '',
}: StarRatingProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`${
            index < rating
              ? 'text-iwanyu-orange fill-iwanyu-orange'
              : 'text-gray-300'
          } mr-0.5`}
        />
      ))}
    </div>
  );
};

export default StarRating;
