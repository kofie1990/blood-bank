import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, SearchIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [donors, setDonors] = useState([]);
  const [donations, setDonations] = useState([]);
  const [bloodSupply, setBloodSupply] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filteredDonors = donors.filter(donor =>
      donor.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredDonors.slice(0, 5)); // Limit to 5 results
  };

  const handleResultClick = (donorId) => {
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/donors/${donorId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    
      const fetchDonors = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:3000/api/donors', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setDonors(data);
        } catch (error) {
          console.error('Error fetching donors:', error);
        }
      };
  
      const fetchDonations = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:3000/api/donations', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setDonations(data);
        } catch (error) {
          console.error('Error fetching donations:', error);
        }
      };
  
      const fetchBloodSupply = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:3000/api/blood-supply', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setBloodSupply(data);
        } catch (error) {
          console.error('Error fetching blood supply:', error);
        }
      };
  
      fetchDonors();
      fetchDonations();
      fetchBloodSupply();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <div className="relative ml-4" ref={searchRef}>
            <input
              type="text"
              className="py-2 pl-10 pr-4 bg-red-100 text-red-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Search donors..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-red-500" />
            {searchResults.length > 0 && (
              <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto z-10">
                {searchResults.map((donor) => (
                  <div
                    key={donor.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleResultClick(donor._id)}
                  >
                    <p className="text-sm font-medium text-gray-900">{donor.name}</p>
                    <p className="text-sm text-gray-500">{donor.bloodType}</p>
                  </div>
                ))}
              </div>
            )}
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