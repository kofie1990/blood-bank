import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useStore from '../store/store';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTint, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';


const DonorDetail = () => {
  const { id } = useParams();
  const { donors, donations } = useStore();

  const donor = donors.find(d => d.id === parseInt(id));
  const donorDonations = donations.filter(d => d.donorId === parseInt(id));

  if (!donor) {
    return <div>Donor not found</div>;
  }

  return (
<div className="h-screen w-screen bg-cover bg-center bg-gradient-to-br from-red-300 to-blue-100 p-4 sm:p-6 overflow-hidden">      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/donors" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Donors
        </Link>
      </motion.div>
      
      <motion.h1 
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {donor.name}
      </motion.h1>
      
      <motion.div 
        className="bg-white shadow-lg overflow-hidden sm:rounded-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-xl leading-6 font-medium text-gray-900">Donor Information</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaTint className="mr-2 text-red-500" /> Blood Type
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{donor.bloodType}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <FaPhoneAlt className="mr-2 text-blue-500" /> Contact
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{donor.contact}</dd>
            </div>
          </dl>
        </div>
      </motion.div>
      
      <motion.h2 
        className="text-2xl font-bold mb-4 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Donation History
      </motion.h2>
      
      {donorDonations.length > 0 ? (
        <motion.ul 
          className="bg-white shadow-lg overflow-hidden sm:rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {donorDonations.map((donation, index) => (
            <motion.li 
              key={donation.id} 
              className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 flex items-center">
                    <FaCalendarAlt className="mr-2" /> {donation.date}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {donation.amount} ml
                    </p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          No donations recorded for this donor.
        </motion.p>
      )}
    </div>
  );
};

export default DonorDetail;