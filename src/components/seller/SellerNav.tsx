
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User } from 'lucide-react';

const SellerNav = () => {
  return (
    <div className="mb-8">
      <div className="flex space-x-4 border-b pb-2">
        <Link to="/" className="flex items-center text-iwanyu-gray hover:text-iwanyu-orange transition-colors">
          <Home className="mr-1 h-4 w-4" />
          Home
        </Link>
        <Link to="/profile" className="flex items-center text-iwanyu-gray hover:text-iwanyu-orange transition-colors">
          <User className="mr-1 h-4 w-4" />
          Profile
        </Link>
      </div>
    </div>
  );
};

export default SellerNav;
