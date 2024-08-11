import React, { useState } from 'react';
import { MenuIcon, SearchIcon } from '@heroicons/react/outline';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="h-screen w-screen bg-full bg-center bg-gradient-to-br from-red-300 to-blue-100">
      <Navbar isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button
            onClick={toggleDrawer}
            className="text-white hover:text-red-200 transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-white tracking-wide">Blood Bank Management System</h1>
          {/* Search Bar */}
          <div className="relative ml-4">
            <input
              type="text"
              className="py-2 pl-10 pr-4 bg-red-100 text-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-red-500" />
          </div>
        </div>
      </header>
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;