import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DonorsList from './components/DonorsList';
import DonorDetail from './components/DonorDetail';
import DonationsList from './components/DonationsList';
import BloodSupplyList from './components/BloodSupplyList';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import useStore from './store/store';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const user = useStore(state => state.user);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/donors" element={
          <ProtectedRoute>
            <Layout>
              <DonorsList />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/donors/:id" element={
          <ProtectedRoute>
            <Layout>
              <DonorDetail />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/donations" element={
          <ProtectedRoute>
            <Layout>
              <DonationsList />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/blood-supply" element={
          <ProtectedRoute>
            <Layout>
              <BloodSupplyList />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;