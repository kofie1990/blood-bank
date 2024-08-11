import React, { useState } from 'react';

import useStore from '../store/store';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';





const DonorsList = () => {

  const { donors, addDonor, updateDonor, deleteDonor } = useStore();

  const [newDonor, setNewDonor] = useState({ name: '', bloodType: '', contact: '' });

  const [editingDonor, setEditingDonor] = useState(null);



  const handleInputChange = (e) => {

    const { name, value } = e.target;

    if (editingDonor) {

      setEditingDonor({ ...editingDonor, [name]: value });

    } else {

      setNewDonor({ ...newDonor, [name]: value });

    }

  };



  const handleSubmit = (e) => {

    e.preventDefault();

    if (editingDonor) {

      updateDonor(editingDonor.id, editingDonor);

      setEditingDonor(null);

    } else {

      addDonor({ ...newDonor, id: Date.now() });

      setNewDonor({ name: '', bloodType: '', contact: '' });

    }

  };



  const handleEdit = (donor) => {

    setEditingDonor(donor);

    setNewDonor({ name: '', bloodType: '', contact: '' });

  };



  const handleDelete = (id) => {

    deleteDonor(id);

  };



  const handleCancelEdit = () => {

    setEditingDonor(null);

    setNewDonor({ name: '', bloodType: '', contact: '' });

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

        onSubmit={handleSubmit} 

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

          />

          <input

            type="text"

            name="bloodType"

            value={editingDonor ? editingDonor.bloodType : newDonor.bloodType}

            onChange={handleInputChange}

            placeholder="Blood Type"

            className="w-full sm:w-32 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"

          />

          <input

            type="text"

            name="contact"

            value={editingDonor ? editingDonor.contact : newDonor.contact}

            onChange={handleInputChange}

            placeholder="Contact"

            className="w-full sm:w-48 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"

          />

          <motion.button 

            type="submit" 

            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"

            whileHover={{ scale: 1.05 }}

            whileTap={{ scale: 0.95 }}

          >

            <FaUserPlus className="mr-2" />

            {editingDonor ? 'Update Donor' : 'Add Donor'}

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

      

      <motion.div 

        className="flex-grow overflow-auto bg-white shadow-lg rounded-lg"

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5, delay: 0.4 }}

      >

        <ul>

          {donors.map((donor, index) => (

            <motion.li 

              key={donor.id} 

              className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300"

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.3, delay: index * 0.1 }}

            >

              <div className="px-4 sm:px-6 py-4">

                <div className="flex items-center justify-between">

                  <Link to={`/donors/${donor.id}`} className="text-lg font-medium text-indigo-600 truncate hover:text-indigo-800 transition-colors duration-300">

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

                      onClick={() => handleEdit(donor)} 

                      className="text-blue-600 hover:text-blue-800 mr-4 flex items-center transition-colors duration-300"

                      whileHover={{ scale: 1.1 }}

                      whileTap={{ scale: 0.9 }}

                    >

                      <FaEdit className="mr-1" /> Edit

                    </motion.button>

                    <motion.button 

                      onClick={() => handleDelete(donor.id)} 

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