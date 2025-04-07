
import React from 'react';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: string;
  buttonText: string;
  recommended?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    price: '10,000 RWF',
    period: '/month',
    description: 'Perfect for new sellers.',
    features: [
      'Add up to 10 products',
      'Basic seller dashboard',
      'Email support',
      'Standard delivery support'
    ],
    icon: '🟠',
    buttonText: 'Subscribe Now'
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '20,000 RWF',
    period: '/month',
    description: 'Ideal for growing businesses.',
    features: [
      'Unlimited products',
      'Advanced dashboard & analytics',
      'Priority email support',
      'Homepage feature eligibility',
      'Integrated delivery tracking'
    ],
    icon: '⚪',
    buttonText: 'Upgrade to Pro',
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '35,000 RWF',
    period: '/month',
    description: 'For top sellers who want full visibility & support.',
    features: [
      'Unlimited products',
      'Advanced dashboard & analytics',
      'Featured on homepage banner',
      'Direct support via WhatsApp',
      'Monthly sales report',
      'Premium delivery (fast dispatch + tracking)'
    ],
    icon: '🧡',
    buttonText: 'Go Premium'
  }
];
