import create from 'zustand';

import React from 'react';

import {

  getDonors,

  addDonor,

  updateDonor,

  deleteDonor,

  getDonations,

  addDonation,

  getBloodSupply,

  updateBloodSupply,

  addBloodSupply

} from '../services/apiService';

import { AuthContext } from '../AuthContext';



const useStore = create((set, get) => ({

  donors: [],

  donations: [],

  bloodSupply: [],

  user: null,

  setUser: (user) => set({ user }),

  initializeUser: () => {

    const { checkAndSetUser } = React.useContext(AuthContext);

    checkAndSetUser();

  },

  logout: () => {

    set({ user: null });

  },

  fetchDonors: async () => {

    const donors = await getDonors();

    set({ donors });

  },

  addDonor: async (donor) => {

    const newDonor = await addDonor(donor);

    set((state) => ({ donors: [...state.donors, newDonor] }));

  },

  updateDonor: async (id, updatedDonor) => {

    const donor = await updateDonor(id, updatedDonor);

    set((state) => ({

      donors: state.donors.map((d) => (d.id === id ? donor : d))

    }));

  },

  deleteDonor: async (id) => {

    await deleteDonor(id);

    set((state) => ({

      donors: state.donors.filter((d) => d.id !== id)

    }));

  },

  fetchDonations: async () => {

    const donations = await getDonations();

    set({ donations });

  },

  addDonation: async (donation) => {

    const newDonation = await addDonation(donation);

    set((state) => ({ donations: [...state.donations, newDonation] }));

    await get().fetchBloodSupply(); // Refresh blood supply after adding a donation

  },

  fetchBloodSupply: async () => {

    const bloodSupply = await getBloodSupply();

    set({ bloodSupply });

  },

  updateBloodSupply: async (bloodType, amount) => {

    const updatedSupply = await updateBloodSupply(bloodType, amount);

    set((state) => ({

      bloodSupply: state.bloodSupply.map((supply) =>

        supply.bloodType === bloodType ? updatedSupply : supply

      )

    }));

  },

  addBloodSupply: async (supply) => {

    const newSupply = await addBloodSupply(supply);

    set((state) => ({ bloodSupply: [...state.bloodSupply, newSupply] }));

  }

}));



export default useStore;