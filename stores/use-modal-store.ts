import { create } from "zustand";

interface IDenomination {
  value: number; // Value of the coin/banknote (e.g., 1, 5, 10, 20, 50, 100, etc.)
  count: number; // Number of this denomination
}

interface IModalStore {
  showChangeModal :boolean;
  setChangeShowModal: (item: boolean) => void;
  showModal :boolean;
  setShowModal: (item: boolean) => void;
}

export const useModalStore = create<IModalStore>((set) => ({
  showChangeModal: false,
  setChangeShowModal: (value: boolean) => set({ showChangeModal: value }),

  showModal: false,
  setShowModal: (value: boolean) => set({ showModal: value }),
}));
