
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import StarRating from './StarRating';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

// Mock review data
const mockReviews = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    rating: 5,
    comment: 'This basket is beautiful! The craftsmanship is excellent and it looks stunning in my living room.',
    date: '2025-03-15',
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Sarah Smith',
    rating: 4,
    comment: 'Good quality product, arrived quickly. Slightly smaller than I expected but still very nice.',
    date: '2025-03-10',
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Michael Johnson',
    rating: 5,
    comment: 'Amazing product! The colors are vibrant and the weaving is tight and well-done.',
    date: '2025-03-05',
  },
];

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState(mockReviews);
  const [userRating, setUserRating] = useState(0);
  
  const form = useForm({
    defaultValues: {
      comment: '',
    },
  });

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  // Handle star click
  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };
  
  // Submit review
  const onSubmit = (data: { comment: string }) => {
    // In a real app, this would be an API call to save the review
    if (userRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive"
      });
      return;
    }
    
    const newReview = {
      id: `review-${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      rating: userRating,
      comment: data.comment,
      date: new Date().toISOString().split('T')[0],
    };
    
    setReviews([newReview, ...reviews]);
    form.reset();
    setUserRating(0);
    
    toast({
      title: "Review submitted!",
      description: `Your review for "${productName}" has been posted.`
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-xl font-semibold">Customer Reviews</h3>
          <div className="flex items-center mt-2">
            <StarRating rating={averageRating} size={20} />
            <span className="ml-2 text-iwanyu-gray">
              {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
            </span>
          </div>
        </div>
        <Button 
          className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
          onClick={() => document.getElementById('write-review')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Write a Review
        </Button>
      </div>

      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">{review.userName}</p>
              <StarRating rating={review.rating} />
            </div>
            <span className="text-iwanyu-gray text-sm">{review.date}</span>
          </div>
          <p className="mt-2 text-iwanyu-dark-gray">{review.comment}</p>
        </div>
      ))}

      <div id="write-review" className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-medium mb-4">Write a Review</h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <FormLabel>Your Rating</FormLabel>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    size={24}
                    className={`cursor-pointer ${
                      rating <= userRating
                        ? 'text-iwanyu-orange fill-iwanyu-orange'
                        : 'text-gray-300'
                    } mr-1`}
                    onClick={() => handleStarClick(rating)}
                  />
                ))}
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your thoughts about this product..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit"
              className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange"
            >
              Submit Review
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductReviews;
