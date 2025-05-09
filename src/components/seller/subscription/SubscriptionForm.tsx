
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import SubscriptionPlanCard from './SubscriptionPlanCard';
import { subscriptionPlans } from './SubscriptionPlansData';
import { toast } from '@/hooks/use-toast';

interface SubscriptionFormProps {
  onSubscribe: (plan: string) => void;
}

type FormValues = {
  plan: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubscribe }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      plan: 'pro' // Pro plan as default
    }
  });

  const handleSubscription = (values: FormValues) => {
    toast({
      title: "Subscription Updated",
      description: `You have successfully subscribed to the ${subscriptionPlans.find(p => p.id === values.plan)?.name} plan.`,
    });
    onSubscribe(values.plan);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubscription)}>
        <RadioGroup
          defaultValue="pro"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          {...form.register("plan")}
        >
          {subscriptionPlans.map((plan) => (
            <FormField
              key={plan.id}
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SubscriptionPlanCard
                      plan={plan}
                      isSelected={field.value === plan.id}
                      onSelect={(planId) => form.setValue('plan', planId)}
                      onSubscribe={() => {
                        form.setValue('plan', plan.id);
                        form.handleSubmit(handleSubscription)();
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </RadioGroup>
      </form>
    </Form>
  );
};

export default SubscriptionForm;
