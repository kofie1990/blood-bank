import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTint, FaPlus, FaWarehouse } from 'react-icons/fa';

const BloodSupplyList = () => {
  const [bloodSupply, setBloodSupply] = useState([]);
  const [newSupply, setNewSupply] = useState({ bloodType: '', quantity: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchBloodSupply();
    console.log(bloodSupply);
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupply({ ...newSupply, [name]: value });
  };

  const addBloodSupply = async (supply) => {
    try {
      const response = await fetch('http://localhost:3000/api/blood-supply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supply),
      });
      const data = await response.json();
      setBloodSupply([...bloodSupply, data]);
    } catch (error) {
      console.error('Error adding blood supply:', error);
    }
  };

  const updateBloodSupply = async (id, supply) => {
    try {
      const response = await fetch(`http://localhost:3000/api/blood-supply/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supply),
      });
      const data = await response.json();
      setBloodSupply(bloodSupply.map((s) => (s._id === id ? data : s)));
    } catch (error) {
      console.error('Error updating blood supply:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(bloodSupply)
      const existingSupply = bloodSupply.find((s) => s.bloodType === newSupply.bloodType);
      console.log('Matching blood supply found:', existingSupply);
      if (existingSupply) {
        await updateBloodSupply(existingSupply._id, {
          ...existingSupply,
          quantity: existingSupply.quantity + newSupply.quantity,
        });
      } else {
        await addBloodSupply({
          bloodType: newSupply.bloodType,
          quantity: newSupply.quantity,
        });
      }
      setNewSupply({ bloodType: '', quantity: '' });
    } catch (error) {
      setError("Error adding/updating blood supply. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/blood-supply/${id}`, {
        method: 'DELETE',
      });
      setBloodSupply(bloodSupply.filter((supply) => supply._id !== id));
    } catch (error) {
      console.error('Error deleting blood supply:', error);
    }
  };

  return (
    <div className="flex-grow flex flex-col bg-gradient-to-br from-red-300 to-blue-100 p-4 sm:p-6 overflow-hidden">
      <motion.h1 
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blood Supply List
      </motion.h1>
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow">
            <FaTint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="bloodType"
              value={newSupply.bloodType}
              onChange={handleInputChange}
              placeholder="Blood Type"
              className="w-full p-2 pl-10 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="relative w-full sm:w-48">
            <FaWarehouse className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              name="quantity"
              value={newSupply.quantity}
              onChange={handleInputChange}
              placeholder="Quantity (units)"
              className="w-full p-2 pl-10 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <motion.button 
            type="submit" 
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            <FaPlus className="mr-2" />
            Add Supply
          </motion.button>
        </div>
      </motion.form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <motion.div 
        className="flex-grow overflow-auto bg-white shadow-lg rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ul>
          {bloodSupply.map((supply, index) => (
            <motion.li 
              key={supply._id} 
              className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaTint className="text-red-500 mr-2" />
                    <p className="text-lg font-medium text-gray-800">{supply.bloodType}</p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {supply.quantity} units
                    </p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default BloodSupplyList;