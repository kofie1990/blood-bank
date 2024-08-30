import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { XIcon, HomeIcon, UserGroupIcon, HeartIcon, BeakerIcon, LogoutIcon } from '@heroicons/react/outline';


const NavItem = ({ to, icon: Icon, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center py-3 px-4 transition-all duration-300 ease-in-out rounded-lg mx-2 ${
          isActive
            ? 'bg-red-700 text-white shadow-lg transform scale-105'
            : 'text-red-100 hover:bg-red-700 hover:text-white hover:shadow-md hover:scale-105'
        }`}
        onClick={onClick}
      >
        <Icon className={`h-6 w-6 mr-3 transition-transform duration-300 ${isActive ? 'rotate-6' : 'group-hover:rotate-6'}`} />
        <span className="font-medium">{children}</span>
      </Link>
    </li>
  );
};

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return logout;
};


const Navbar = ({ isOpen, onClose }) => {
  const logout = useLogout();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-20"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white shadow-2xl transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-all duration-300 ease-in-out z-30 bg-opacity-80 backdrop-filter backdrop-blur-lg`}
      >
        <div className="flex justify-between items-center p-6 bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
          <h2 className="text-2xl font-bold text-red-100">Blood Bank</h2>
          <button onClick={onClose} className="text-red-100 hover:text-white transition-colors duration-200 rounded-full p-1 hover:bg-red-700">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-3">
            <NavItem to="/" icon={HomeIcon} onClick={onClose}>Dashboard</NavItem>
            <NavItem to="/donors" icon={UserGroupIcon} onClick={onClose}>Donors</NavItem>
            <NavItem to="/donations" icon={HeartIcon} onClick={onClose}>Donations</NavItem>
            <NavItem to="/blood-supply" icon={BeakerIcon} onClick={onClose}>Blood Supply</NavItem>
          </ul>
        </nav>
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center justify-center bg-red-800 text-white px-4 py-3 rounded-lg hover:bg-red-900 transition-all duration-300 ease-in-out hover:shadow-lg transform hover:scale-105"
          >
            <LogoutIcon className="h-5 w-5 mr-2" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;