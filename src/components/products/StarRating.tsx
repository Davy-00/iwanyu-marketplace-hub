
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  onClick?: (rating: number) => void;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = 16,
  className = '',
  onClick,
}: StarRatingProps) => {
  // Make sure rating is within bounds
  const normalizedRating = Math.min(Math.max(0, rating), maxRating);
  
  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`${
            index < normalizedRating
              ? 'text-iwanyu-orange fill-iwanyu-orange'
              : 'text-gray-300'
          } mr-0.5 ${onClick ? 'cursor-pointer' : ''}`}
          onClick={() => onClick && onClick(index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
