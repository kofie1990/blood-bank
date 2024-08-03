import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUser } from '../services/authService';

const useStore = create(
  persist(
    (set, get) => ({
      donors: [],
      donations: [],
      bloodSupply: [],
      user: getCurrentUser(),
      setUser: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null });
      },
      addDonation: (donation) => {
        set((state) => ({ donations: [...state.donations, donation] }));
        get().updateBloodSupply(donation.bloodType, donation.amount);
      },
      updateBloodSupply: (bloodType, amount) => set((state) => {
        const existingSupply = state.bloodSupply.find(supply => supply.bloodType === bloodType);
        if (existingSupply) {
          return {
            bloodSupply: state.bloodSupply.map(supply =>
              supply.bloodType === bloodType
                ? { ...supply, quantity: supply.quantity + parseInt(amount) }
                : supply
            )
          };
        } else {
          return {
            bloodSupply: [...state.bloodSupply, { id: Date.now(), bloodType, quantity: parseInt(amount) }]
          };
        }
      }),
  addBloodSupply: (supply) => set((state) => ({ bloodSupply: [...state.bloodSupply, supply] })),
  addDonor: (donor) => set((state) => ({ donors: [...state.donors, donor] })),
  updateDonor: (id, updatedDonor) => set((state) => ({
    donors: state.donors.map((donor) => donor.id === id ? { ...donor, ...updatedDonor } : donor)
  })),
  deleteDonor: (id) => set((state) => ({
    donors: state.donors.filter((donor) => donor.id !== id)
  })),
}),
{
  name: 'blood-bank-storage',
  getStorage: () => localStorage,
}
)
);

export default useStore;