
import React, { ReactNode } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

interface MainLayoutProps {
  children: ReactNode;
  showSearch?: boolean;
}

const MainLayout = ({ children, showSearch = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
