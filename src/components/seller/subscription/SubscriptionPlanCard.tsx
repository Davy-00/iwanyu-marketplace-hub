
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Circle, CircleDot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type SubscriptionPlan } from './SubscriptionPlansData';
import { useNavigate } from 'react-router-dom';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
  onSubscribe: () => void;
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({ 
  plan, 
  isSelected, 
  onSelect,
  onSubscribe 
}) => {
  const navigate = useNavigate();

  const handleSubscribe = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(plan.id);
    // Navigate to payment page with plan ID as query parameter
    navigate(`/seller-payment?plan=${plan.id}`);
    onSubscribe();
  };

  return (
    <Card 
      className={`relative cursor-pointer border-2 h-full flex flex-col ${
        isSelected 
          ? 'border-iwanyu-orange shadow-lg' 
          : plan.recommended 
            ? 'border-iwanyu-orange/50' 
            : 'border-gray-200'
      }`}
      onClick={() => onSelect(plan.id)}
    >
      {plan.recommended && (
        <div className="absolute -top-4 left-0 right-0 text-center">
          <span className="bg-iwanyu-orange text-white px-4 py-1 rounded-full text-sm font-medium">
            Recommended
          </span>
        </div>
      )}
      <div className="absolute top-4 right-4">
        {isSelected ? (
          <CircleDot className="h-5 w-5 text-iwanyu-orange" />
        ) : (
          <Circle className="h-5 w-5 text-gray-400" />
        )}
      </div>
      <CardHeader>
        <div className="text-2xl mb-2">{plan.icon}</div>
        <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{plan.price}</span>
          {plan.period && <span className="text-sm text-iwanyu-gray">{plan.period}</span>}
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          type="button"
          onClick={handleSubscribe}
          className={`w-full ${
            isSelected 
              ? 'bg-iwanyu-orange hover:bg-iwanyu-dark-orange' 
              : plan.id === 'premium'
                ? 'bg-iwanyu-orange hover:bg-iwanyu-dark-orange' 
                : ''
          }`}
        >
          {plan.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionPlanCard;
