import React, { useState } from 'react';
import useStore from '../store/store';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTint, FaUserPlus } from 'react-icons/fa';


const DonationsList = () => {
  const { donations, addDonation, donors } = useStore();
  const [newDonation, setNewDonation] = useState({ donorId: '', date: '', amount: '', bloodType: '' });

  const handleInputChange = (e) => {
    setNewDonation({ ...newDonation, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const donor = donors.find(d => d.id === parseInt(newDonation.donorId));
    addDonation({ 
      ...newDonation, 
      id: Date.now(),
      donorId: parseInt(newDonation.donorId),
      bloodType: donor.bloodType, // Use the donor's blood type
      amount: parseInt(newDonation.amount)
    });
    setNewDonation({ donorId: '', date: '', amount: '', bloodType: '' });
  };
    return (
      <div className="flex-grow flex flex-col bg-gradient-to-br from-red-300 to-blue-100 p-4 sm:p-6 overflow-hidden">
        <motion.h1 
          className="text-3xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Donations List
        </motion.h1>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="mb-6 bg-gray-200 p-4 sm:p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <select
              name="donorId"
              value={newDonation.donorId}
              onChange={handleInputChange}
              className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Donor</option>
              {donors.map((donor) => (
                <option key={donor.id} value={donor.id}>
                  {donor.name} ({donor.bloodType})
                </option>
              ))}
            </select>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="date"
                value={newDonation.date}
                onChange={handleInputChange}
                className="w-full sm:w-48 p-2 pl-10 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="relative">
              <FaTint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="amount"
                value={newDonation.amount}
                onChange={handleInputChange}
                placeholder="Amount (ml)"
                className="w-full sm:w-32 p-2 pl-10 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <motion.button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserPlus className="mr-2" />
              Add Donation
            </motion.button>
          </div>
        </motion.form>
        
        <motion.div 
          className="flex-grow overflow-auto bg-gray-200 shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ul>
            {donations.map((donation, index) => {
              const donor = donors.find(d => d.id === donation.donorId);
              return (
                <motion.li 
                  key={donation.id} 
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-indigo-600 truncate">{donor ? donor.name : 'Unknown Donor'}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {donation.amount} ml ({donation.bloodType})
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <FaCalendarAlt className="mr-2 text-gray-400" />
                          {donation.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    );
  };
  
  export default DonationsList;