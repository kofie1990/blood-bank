import React from 'react';
import useStore from '../store/store';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, count, link }) => (
  <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-4xl font-bold text-blue-600">{count}</p>
  </Link>
);

const Dashboard = () => {
  const { donors, donations, bloodSupply } = useStore();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Donors" count={donors.length} link="/donors" />
        <DashboardCard title="Total Donations" count={donations.length} link="/donations" />
        <DashboardCard title="Blood Supply Units" count={bloodSupply.length} link="/blood-supply" />
      </div>
    </div>
  );
};

export default Dashboard;