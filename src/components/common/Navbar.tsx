
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state

  return (
    <nav className="bg-white shadow-sm">
      <div className="iwanyu-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-iwanyu-orange">Iwanyu</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-xl">
              <Input
                type="text"
                placeholder="Search for products, shops..."
                className="w-full pl-10 pr-4"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-iwanyu-gray" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/shops" className="text-iwanyu-dark-gray hover:text-iwanyu-orange transition-colors">
              Shops
            </Link>
            <Link to="/cart" className="relative text-iwanyu-dark-gray hover:text-iwanyu-orange transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-iwanyu-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
            {isLoggedIn ? (
              <div className="relative">
                <Button variant="ghost" className="p-0">
                  <User className="h-6 w-6 text-iwanyu-dark-gray" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="default" className="bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4 text-iwanyu-dark-gray">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-iwanyu-orange text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-iwanyu-dark-gray" />
              ) : (
                <Menu className="h-6 w-6 text-iwanyu-dark-gray" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for products, shops..."
              className="w-full pl-10 pr-4"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-iwanyu-gray" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link to="/shops" className="block py-2 text-iwanyu-dark-gray hover:text-iwanyu-orange">
              Shops
            </Link>
            <Link to="/contact" className="block py-2 text-iwanyu-dark-gray hover:text-iwanyu-orange">
              Contact
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/account" className="block py-2 text-iwanyu-dark-gray hover:text-iwanyu-orange">
                  My Account
                </Link>
                <Button variant="outline" className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth" className="block">
                <Button variant="default" className="w-full bg-iwanyu-orange hover:bg-iwanyu-dark-orange">
                  Login / Register
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
