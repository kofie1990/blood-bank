import React, { useState } from 'react';
import useStore from '../store/store';

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
    <div>
      <h1 className="text-3xl font-bold mb-6">Blood Supply List</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            name="bloodType"
            value={newSupply.bloodType}
            onChange={handleInputChange}
            placeholder="Blood Type"
            className="flex-grow p-2 border rounded"
          />
          <input
            type="number"
            name="quantity"
            value={newSupply.quantity}
            onChange={handleInputChange}
            placeholder="Quantity (units)"
            className="w-48 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Supply
          </button>
        </div>
      </form>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md">
        {bloodSupply.map((supply) => (
          <li key={supply.id} className="border-b last:border-b-0">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">{supply.bloodType}</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {supply.quantity} units
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BloodSupplyList;