import axios from 'axios';



const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed



export const getDonors = async () => {

  const response = await axios.get(`${API_URL}/donors`);

  return response.data;

};



export const addDonor = async (donor) => {

  const response = await axios.post(`${API_URL}/donors`, donor);

  return response.data;

};



export const updateDonor = async (id, updatedDonor) => {

  const response = await axios.put(`${API_URL}/donors/${id}`, updatedDonor);

  return response.data;

};



export const deleteDonor = async (id) => {

  await axios.delete(`${API_URL}/donors/${id}`);

};



export const getDonations = async () => {

  const response = await axios.get(`${API_URL}/donations`);

  return response.data;

};



export const addDonation = async (donation) => {

  const response = await axios.post(`${API_URL}/donations`, donation);

  return response.data;

};



export const getBloodSupply = async () => {

  const response = await axios.get(`${API_URL}/blood-supply`);

  return response.data;

};



export const updateBloodSupply = async (bloodType, amount) => {

  const response = await axios.put(`${API_URL}/blood-supply`, { bloodType, amount });

  return response.data;

};



export const addBloodSupply = async (supply) => {

  const response = await axios.post(`${API_URL}/blood-supply`, supply);

  return response.data;

};