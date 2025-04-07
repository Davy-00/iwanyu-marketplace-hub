
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const SubscriptionFAQ: React.FC = () => {
  const faqs = [
    {
      id: 'payments',
      question: 'How do I get paid?',
      answer: 'Payments are processed weekly and transferred directly to your bank account or mobile money. You can set up your preferred payment method in your seller profile.'
    },
    {
      id: 'plan-change',
      question: 'Can I upgrade or downgrade my plan later?',
      answer: 'Yes, you can change your subscription plan at any time from your seller dashboard. Changes will take effect at the start of your next billing cycle.'
    },
    {
      id: 'support',
      question: 'What happens if I need help?',
      answer: 'Our support team is available via email and chat to help with any questions or issues. Premium plan subscribers also get direct WhatsApp support.'
    },
    {
      id: 'billing',
      question: 'How does billing work?',
      answer: 'We offer monthly subscription plans. You can pay using mobile money, credit/debit cards, or bank transfers. Receipts are sent via email.'
    },
    {
      id: 'cancel',
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription at any time from your seller dashboard. You\'ll still have access to your current plan until the end of your billing cycle.'
    }
  ];

  return (
    <div className="mt-12 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-iwanyu-gray">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SubscriptionFAQ;
