import React, { useState } from 'react';
import useStore from '../store/store';

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
    <div>
      <h1 className="text-3xl font-bold mb-6">Donations List</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-4">
          <select
            name="donorId"
            value={newDonation.donorId}
            onChange={handleInputChange}
            className="flex-grow p-2 border rounded"
            required
          >
            <option value="">Select Donor</option>
            {donors.map((donor) => (
              <option key={donor.id} value={donor.id}>
                {donor.name} ({donor.bloodType})
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={newDonation.date}
            onChange={handleInputChange}
            className="w-48 p-2 border rounded"
            required
          />
          <input
            type="number"
            name="amount"
            value={newDonation.amount}
            onChange={handleInputChange}
            placeholder="Amount (ml)"
            className="w-32 p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Donation
          </button>
        </div>
      </form>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md">
        {donations.map((donation) => {
          const donor = donors.find(d => d.id === donation.donorId);
          return (
            <li key={donation.id} className="border-b last:border-b-0">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{donor ? donor.name : 'Unknown Donor'}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {donation.amount} ml ({donation.bloodType})
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {donation.date}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DonationsList;