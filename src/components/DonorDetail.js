import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useStore from '../store/store';

const DonorDetail = () => {
  const { id } = useParams();
  const { donors, donations } = useStore();

  const donor = donors.find(d => d.id === parseInt(id));
  const donorDonations = donations.filter(d => d.donorId === parseInt(id));

  if (!donor) {
    return <div>Donor not found</div>;
  }

  return (
    <div>
      <Link to="/donors" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">&larr; Back to Donors</Link>
      <h1 className="text-3xl font-bold mb-6">{donor.name}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Donor Information</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Blood Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{donor.bloodType}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Contact</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{donor.contact}</dd>
            </div>
          </dl>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Donation History</h2>
      {donorDonations.length > 0 ? (
        <ul className="bg-white shadow overflow-hidden sm:rounded-md">
          {donorDonations.map((donation) => (
            <li key={donation.id} className="border-b last:border-b-0">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{donation.date}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {donation.amount} ml
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations recorded for this donor.</p>
      )}
    </div>
  );
};

export default DonorDetail;