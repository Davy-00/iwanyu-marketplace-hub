
import { z } from 'zod';

// Define the schema for subscription plans
export const subscriptionPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  priceValue: z.number(), // Numerical value for pricing calculations
  period: z.string().optional(),
  features: z.array(z.string()),
  buttonText: z.string(),
  icon: z.string(),
  recommended: z.boolean().optional(),
});

// Create the type from the schema
export type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>;

// Define the subscription plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Seller',
    description: 'Perfect for beginners getting started with online selling',
    price: 'RWF 10,000',
    priceValue: 10000,
    period: '/month',
    features: [
      'List up to 10 products',
      'Basic analytics dashboard',
      'Standard support',
      'Standard listing visibility',
    ],
    buttonText: 'Get Started',
    icon: '🛍️',
  },
  {
    id: 'pro',
    name: 'Professional Seller',
    description: 'Everything you need for growing your business',
    price: 'RWF 25,000',
    priceValue: 25000,
    period: '/month',
    features: [
      'List up to 50 products',
      'Advanced analytics dashboard',
      'Priority support',
      'Enhanced listing visibility',
      'Access to promotional tools',
    ],
    buttonText: 'Go Pro',
    icon: '⭐',
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium Seller',
    description: 'Ultimate selling package for established businesses',
    price: 'RWF 50,000',
    priceValue: 50000,
    period: '/month',
    features: [
      'Unlimited product listings',
      'Comprehensive analytics & insights',
      'Dedicated account manager',
      'Top search placement',
      'Advanced promotional tools',
      'Customizable store front',
      'Exclusive seller events',
    ],
    buttonText: 'Go Premium',
    icon: '👑',
  }
];
