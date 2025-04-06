
import React, { ReactNode } from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import SearchAndFilter from '@/components/search/SearchAndFilter';

interface MainLayoutProps {
  children: ReactNode;
  showSearch?: boolean;
}

const MainLayout = ({ children, showSearch = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {showSearch && (
        <div className="bg-gray-50 py-4 border-b">
          <div className="iwanyu-container">
            <SearchAndFilter />
          </div>
        </div>
      )}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
