import React, { useState } from 'react';
import useStore from '../store/store';
import { Link } from 'react-router-dom';

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
    <div>
      <h1 className="text-3xl font-bold mb-6">Donors List</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            value={editingDonor ? editingDonor.name : newDonor.name}
            onChange={handleInputChange}
            placeholder="Donor Name"
            className="flex-grow p-2 border rounded"
          />
          <input
            type="text"
            name="bloodType"
            value={editingDonor ? editingDonor.bloodType : newDonor.bloodType}
            onChange={handleInputChange}
            placeholder="Blood Type"
            className="w-32 p-2 border rounded"
          />
          <input
            type="text"
            name="contact"
            value={editingDonor ? editingDonor.contact : newDonor.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            className="w-48 p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {editingDonor ? 'Update Donor' : 'Add Donor'}
          </button>
          {editingDonor && (
            <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
          )}
        </div>
      </form>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md">
        {donors.map((donor) => (
          <li key={donor.id} className="border-b last:border-b-0">
            <div className="px-4 py-4 sm:px-6">
    <div className="flex items-center justify-between">
      <Link to={`/donors/${donor.id}`} className="text-sm font-medium text-indigo-600 truncate hover:text-indigo-800">
        {donor.name}
      </Link>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {donor.bloodType}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {donor.contact}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <button onClick={() => handleEdit(donor)} className="text-blue-600 hover:text-blue-800 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(donor.id)} className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonorsList;