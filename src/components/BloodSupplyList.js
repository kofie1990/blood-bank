import React, { useState } from 'react';
import useStore from '../store/store';
import { motion } from 'framer-motion';
import { FaTint, FaPlus, FaWarehouse } from 'react-icons/fa';


const BloodSupplyList = () => {
  const { bloodSupply, addBloodSupply } = useStore();
  const [newSupply, setNewSupply] = useState({ bloodType: '', quantity: '' });

  const handleInputChange = (e) => {
    setNewSupply({ ...newSupply, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBloodSupply({ ...newSupply, id: Date.now() });
    setNewSupply({ bloodType: '', quantity: '' });
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
              />
            </div>
            <motion.button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus className="mr-2" />
              Add Supply
            </motion.button>
          </div>
        </motion.form>
        
        <motion.div 
          className="flex-grow overflow-auto bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ul>
            {bloodSupply.map((supply, index) => (
              <motion.li 
                key={supply.id} 
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