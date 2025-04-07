
import React from 'react';

const SubscriptionFAQ: React.FC = () => {
  return (
    <div className="mt-12 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">How do I get paid?</h3>
          <p className="text-iwanyu-gray">Payments are processed weekly and transferred directly to your bank account or mobile money.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Can I upgrade or downgrade my plan later?</h3>
          <p className="text-iwanyu-gray">Yes, you can change your subscription plan at any time from your seller dashboard.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">What happens if I need help?</h3>
          <p className="text-iwanyu-gray">Our support team is available via email and chat to help with any questions or issues.</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFAQ;
