import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";

const DonorsList = () => {
  const [donors, setDonors] = useState([]);
  const [newDonor, setNewDonor] = useState({ name: '', email: '', bloodType: '' });
  const [editingDonor, setEditingDonor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        console.log(donors);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    fetchDonors();
  }, [donors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingDonor) {
      setEditingDonor({ ...editingDonor, [name]: value });
    } else {
      setNewDonor({ ...newDonor, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDonor),
      });
      const data = await response.json();
      setDonors([...donors, data]);
      setNewDonor({ name: '', email: '', bloodType: '' });
    } catch (error) {
      console.error('Error creating donor:', error);
    } finally { 
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/donors/${editingDonor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingDonor),
      });
      const data = await response.json();
      setDonors(donors.map((donor) => (donor._id === data._id ? data : donor)));
      setEditingDonor(null);
    } catch (error) {
      console.error('Error updating donor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/donors/${id}`, {
        method: 'DELETE',
      });
      setDonors(donors.filter((donor) => donor._id !== id));
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingDonor(null);
    setNewDonor({ name: "", bloodType: "", contact: "" });
  };

  const startEditing = (donor) => {
    setEditingDonor(donor);
  };

  return (
    <div className="flex-grow flex flex-col bg-gradient-to-br from-red-300 to-blue-100 p-4 sm:p-6 overflow-hidden">
      <motion.h1
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Donors List
      </motion.h1>

      <motion.form
        onSubmit={editingDonor ? handleEdit : handleSubmit}
        className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            name="name"
            value={editingDonor ? editingDonor.name : newDonor.name}
            onChange={handleInputChange}
            placeholder="Donor Name"
            className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <input
            type="text"
            name="bloodType"
            value={editingDonor ? editingDonor.bloodType : newDonor.bloodType}
            onChange={handleInputChange}
            placeholder="Blood Type"
            className="w-full sm:w-32 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <input
            type="text"
            name="contact"
            value={editingDonor ? editingDonor.contact : newDonor.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            className="w-full sm:w-48 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <motion.button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            <FaUserPlus className="mr-2" />
            {editingDonor ? "Update Donor" : "Add Donor"}
          </motion.button>

          {editingDonor && (
            <motion.button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300 mt-2 sm:mt-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
          )}
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
          {donors.map((donor, index) => (
            <motion.li
              key={donor._id}
              className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                  <Link
                    to={`/donors/${donor._id}`}
                    className="text-lg font-medium text-indigo-600 truncate hover:text-indigo-800 transition-colors duration-300"
                  >
                    {donor.name}
                  </Link>

                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {donor.bloodType}
                    </p>
                  </div>
                </div>

                <div className="mt-2 sm:flex sm:justify-between">
                  <p className="flex items-center text-sm text-gray-500">
                    {donor.contact}
                  </p>

                  <div className="mt-2 flex items-center text-sm sm:mt-0">
                    <motion.button
                      onClick={() => startEditing(donor)}
                      className="text-blue-600 hover:text-blue-800 mr-4 flex items-center transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </motion.button>

                    <motion.button
                      onClick={() => handleDelete(donor._id)}
                      className="text-red-600 hover:text-red-800 flex items-center transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash className="mr-1" /> Delete
                    </motion.button>
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

export default DonorsList;