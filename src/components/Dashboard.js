import React from 'react';
import useStore from '../store/store';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaTint, FaBoxes } from 'react-icons/fa';

const DashboardCard = ({ title, count, link, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
<Link to={link} className="block bg-gray-200 p-6 rounded-xl shadow-lg hover:bg-gradient-to-br hover:from-blue-100 hover:to-red-300 hover:text-white transition-colors duration-300">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <motion.p 
        className="text-4xl font-bold text-blue-600"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {count}
      </motion.p>
    </Link>
  </motion.div>
);

const Dashboard = () => {
  const { donors, donations, bloodSupply } = useStore();

  const cards = [
    { title: "Total Donors", count: donors.length, link: "/donors", icon: <FaUsers className="text-blue-500 text-2xl" /> },
    { title: "Total Donations", count: donations.length, link: "/donations", icon: <FaTint className="text-red-500 text-2xl" /> },
    { title: "Blood Supply Units", count: bloodSupply.length, link: "/blood-supply", icon: <FaBoxes className="text-green-500 text-2xl" /> },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-red-300 to-blue-100 p-4 sm:p-6 md:p-8 flex flex-col">
      <motion.h1 
        className="text-3xl sm:text-4xl font-bold mb-6 text-gray-600 text-left"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blood Bank Dashboard
      </motion.h1>
      
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
      
      <motion.div
        className="bg-gray-200 p-4 sm:p-6 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Summary</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Our blood bank currently has {donors.length} registered donors who have made a total of {donations.length} donations. 
          We have {bloodSupply.length} units of blood available in our supply.
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;