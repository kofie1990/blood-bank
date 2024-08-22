import axios from 'axios';



const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed



export const getDonors = async () => {
  const response = await fetch(`${API_URL}/donors`);
  if (!response.ok) throw new Error('Failed to fetch donors');
  return response.json();
};



export const addDonor = async (donorData) => {
  const response = await fetch(`${API_URL}/donors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donorData),
  });
  if (!response.ok) throw new Error('Failed to add donor');
  return response.json();
};



export const updateDonor = async (id, donorData) => {
  const response = await fetch(`${API_URL}/donors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donorData),
  });
  if (!response.ok) throw new Error('Failed to update donor');
  return response.json();
};



export const deleteDonor = async (id) => {
  const response = await fetch(`${API_URL}/donors/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete donor');
  return response.json();
};



export const getDonations = async () => {
  const response = await fetch(`${API_URL}/donations`);
  if (!response.ok) throw new Error('Failed to fetch donations');
  return response.json();
};



export const addDonation = async (donationData) => {
  const response = await fetch(`${API_URL}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donationData),
  });
  if (!response.ok) throw new Error('Failed to add donation');
  return response.json();
};



export const getBloodSupply = async () => {
  const response = await fetch(`${API_URL}/blood-supply`);
  if (!response.ok) throw new Error('Failed to fetch blood supply');
  return response.json();
};



export const updateBloodSupply = async (bloodType, amount) => {

  const response = await axios.put(`${API_URL}/blood-supply`, { bloodType, amount });

  return response.data;

};



export const addBloodSupply = async (supplyData) => {
  const response = await fetch(`${API_URL}/blood-supply`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(supplyData),
  });
  if (!response.ok) throw new Error('Failed to update blood supply');
  return response.json();
};