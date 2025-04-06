
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductGrid from '@/components/products/ProductGrid';
import StarRating from '@/components/products/StarRating';
import ProductReviews from '@/components/products/ProductReviews';
import WishlistButton from '@/components/products/WishlistButton';

// Mock product data
const productData = {
  id: '1',
  name: 'Handwoven Basket',
  price: 15000,
  description: 'Beautiful handwoven basket made by skilled artisans in Rwanda. This decorative piece adds a touch of African craftsmanship to any home.',
  images: [
    'https://images.unsplash.com/photo-1622467827417-bbe6d313a9f5',
    'https://images.unsplash.com/photo-1532301271423-751c03fff13c',
    'https://images.unsplash.com/photo-1622467619403-9b36e58ad5fb'
  ],
  shop: {
    id: '1',
    name: 'Rwanda Crafts'
  },
  details: {
    material: 'Natural fibers',
    dimensions: '10" x 12"',
    weight: '0.5kg'
  },
  rating: 4.5,
  reviewsCount: 23
};

// Mock related products
const relatedProducts = [
  {
    id: '2',
    name: 'Colorful Wall Basket',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1532301271423-751c03fff13c',
    shop: {
      id: '1',
      name: 'Rwanda Crafts'
    }
  },
  {
    id: '3',
    name: 'Traditional Mask',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1560125656-34a3ffc98e86',
    shop: {
      id: '1',
      name: 'Rwanda Crafts'
    }
  },
  {
    id: '4',
    name: 'Handmade Jewelry',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584',
    shop: {
      id: '1',
      name: 'Rwanda Crafts'
    }
  }
];

const Product = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    // Add to cart functionality will be implemented later
    toast({
      title: "Added to cart",
      description: `${quantity} x ${productData.name} added to your cart.`,
    });
  };
  
  return (
    <MainLayout>
      <div className="iwanyu-container py-12">
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square overflow-hidden rounded-lg mb-4">
              <img 
                src={productData.images[selectedImage]} 
                alt={productData.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {productData.images.map((image, index) => (
                <div 
                  key={index}
                  className={`aspect-square overflow-hidden rounded-lg cursor-pointer border-2 ${
                    selectedImage === index ? 'border-iwanyu-orange' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${productData.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-2">
              <Link 
                to={`/shop/${productData.shop.id}`} 
                className="text-iwanyu-gray hover:text-iwanyu-orange transition-colors"
              >
                {productData.shop.name}
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
            
            {/* Rating display */}
            <div className="flex items-center mb-4">
              <StarRating rating={productData.rating} />
              <span className="ml-2 text-iwanyu-gray">
                {productData.rating.toFixed(1)} ({productData.reviewsCount} reviews)
              </span>
            </div>
            
            <div className="text-2xl font-semibold text-iwanyu-orange mb-6">
              {productData.price.toLocaleString('en-US', { style: 'currency', currency: 'RWF' })}
            </div>
            
            <p className="text-iwanyu-gray mb-8">{productData.description}</p>
            
            <div className="mb-8">
              <label className="block text-iwanyu-dark-gray mb-2">Quantity</label>
              <div className="flex w-32">
                <Button
                  type="button"
                  variant="outline"
                  className="px-3"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </Button>
                <div className="flex-1 text-center flex items-center justify-center border-t border-b">
                  {quantity}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="px-3"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleAddToCart} 
                className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange flex-grow sm:flex-grow-0"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <WishlistButton 
                productId={productData.id} 
                productName={productData.name}
                className="flex-grow sm:flex-grow-0"
              />
              
              <Button variant="outline" className="flex-grow sm:flex-grow-0">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="qa">Q&A</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Product Details</h3>
                <ul className="space-y-2">
                  <li><span className="text-iwanyu-gray">Material:</span> {productData.details.material}</li>
                  <li><span className="text-iwanyu-gray">Dimensions:</span> {productData.details.dimensions}</li>
                  <li><span className="text-iwanyu-gray">Weight:</span> {productData.details.weight}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Care Instructions</h3>
                <p className="text-iwanyu-gray">
                  Dust regularly with a soft cloth. Avoid exposure to direct sunlight for prolonged periods.
                  Clean spills immediately with a dry cloth.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="py-4">
            <p className="text-iwanyu-gray">
              We offer standard shipping across Rwanda. Delivery usually takes 2-5 business days
              depending on your location. For Kigali residents, express delivery is available
              with same-day or next-day options.
            </p>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <ProductReviews productId={productData.id} productName={productData.name} />
          </TabsContent>
          <TabsContent value="qa" className="py-4">
            <p className="text-center text-iwanyu-gray py-8">
              No questions yet. Be the first to ask a question about this product!
            </p>
          </TabsContent>
        </Tabs>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Product;
