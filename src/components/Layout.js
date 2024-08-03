import React, { useState } from 'react';
import { MenuIcon } from '@heroicons/react/outline';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Main content */}
      <div className="pl-0">
        <header className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={toggleDrawer}
              className="text-white hover:text-red-200 transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-white tracking-wide">Blood Bank Management</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;