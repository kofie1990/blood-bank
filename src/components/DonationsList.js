import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaTint, FaUserPlus, FaTrash } from "react-icons/fa";

const DonationsList = () => {
  const [donors, setDonors] = useState([]);
  const [donations, setDonations] = useState([]);
  const [bloodSupply, setBloodSupply] = useState([]);
  const [newDonation, setNewDonation] = useState({ donorId: "", date: "", amount: "" });
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
  }, []);

  const handleInputChange = (e) => {
    setNewDonation({ ...newDonation, [e.target.name]: e.target.value });
    console.log(donors)
    console.log(newDonation);
  };

  const addDonation = async (donation) => {
    try {
      const response = await fetch('http://localhost:3000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donation),
      });
      const data = await response.json();
      setDonations([...donations, data]);
    } catch (error) {
      console.error('Error adding donation:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const donor = donors.find((d) => d._id === newDonation.donorId);
    if (!donor) {
      setError("Donor not found");
      setIsLoading(false);
      return;
    }

    try {
      const donation = {
        donor: newDonation.donorId,
        date: new Date(newDonation.date),
        bloodType: donor.bloodType,
        amount: parseInt(newDonation.amount, 10),
      };

      // Update blood supply
      console.log(bloodSupply)
      const existingSupply = bloodSupply.find((s) => s.bloodType === donor.bloodType);
      console.log('Matching blood supply found:', existingSupply);
      if (existingSupply) {
        await updateBloodSupply(existingSupply._id, {
          ...existingSupply,
          quantity: existingSupply.quantity + donation.amount,
        });
      } else {
        await addBloodSupply({
          bloodType: donor.bloodType,
          quantity: donation.amount,
        });
      }

      await addDonation(donation);

      setNewDonation({ donorId: "", date: "", amount: "" });
    } catch (error) {
      setError("Error adding donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/donations/${id}`, {
        method: 'DELETE',
      });
      setDonations(donations.filter((donation) => donation._id !== id));
    } catch (error) {
      console.error('Error deleting donation:', error);
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
        Donations List
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="mb-6 bg-white p-4 sm:p-6 rounded-lg shadow-md"
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
              <option key={donor._id} value={donor._id}>
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
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            <FaUserPlus className="mr-2" />
            Add Donation
          </motion.button>
        </div>
      </motion.form>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
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
          {donations.map((donation, index) => {
            const donor = donors.find((d) => d._id === donation.donor);

            return (
              <motion.li
                key={donation._id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-indigo-600 truncate">
                      {donor ? donor.name : "Unknown Donor"}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {donation.amount} ml (
                        {donor ? donor.bloodType : "Unknown Blood Type"})
                      </p>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <FaCalendarAlt className="mr-2 text-gray-400" />
                          {new Date(donation.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(donation._id)}
                  >
                    <FaTrash />
                  </motion.button>
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
