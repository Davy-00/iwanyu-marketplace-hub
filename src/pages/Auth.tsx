
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import AuthForms from '@/components/auth/AuthForms';

const Auth = () => {
  return (
    <MainLayout>
      <div className="iwanyu-container py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Account Access</h1>
          <AuthForms />
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;
