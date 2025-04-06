
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-iwanyu-dark-gray text-white pt-12 pb-6">
      <div className="iwanyu-container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-iwanyu-orange mb-4 block">Iwanyu</Link>
            <p className="text-gray-300 mb-4">
              Your one-stop marketplace for Rwanda's local businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-iwanyu-orange">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-iwanyu-orange">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-iwanyu-orange">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-iwanyu-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shops" className="text-gray-300 hover:text-iwanyu-orange transition-colors">
                  All Shops
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-300 hover:text-iwanyu-orange transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-iwanyu-orange transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-iwanyu-orange transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-iwanyu-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-300 hover:text-iwanyu-orange transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-iwanyu-orange" />
                <span className="text-gray-300">info@iwanyu.rw</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-iwanyu-orange" />
                <span className="text-gray-300">+250 123 456 789</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Iwanyu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
