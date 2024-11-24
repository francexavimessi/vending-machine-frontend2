import { create } from "zustand";

interface IDenomination {
  value: number; // Value of the coin/banknote (e.g., 1, 5, 10, 20, 50, 100, etc.)
  count: number; // Number of this denomination
}

interface IMoneyStore {
  total: number; // Total money
  denominations: IDenomination[]; // List of denominations and their counts
  addMoney: (value: number, count: number) => void; // Add money by denomination
  deductMoney: (value: number, count: number) => void; // Deduct money by denomination
  resetMoney: () => void; // Reset the total and denominations
  subMenuPage: string; // State for submenu navigation
  setSubMenuPage: (value: string) => void;
}

export const useMoneyStore = create<IMoneyStore>((set) => ({
  total: 0,
  denominations: [],

  // Add money
  addMoney: (value, count) =>
    set((state) => {
      const existingDenomination = state.denominations.find(
        (denomination) => denomination.value === value
      );

      // Update the count if the denomination exists
      if (existingDenomination) {
        return {
          total: state.total + value * count,
          denominations: state.denominations.map((denomination) =>
            denomination.value === value
              ? { ...denomination, count: denomination.count + count }
              : denomination
          ),
        };
      }

      // Add new denomination
      return {
        total: state.total + value * count,
        denominations: [...state.denominations, { value, count }],
      };
    }),

  // Deduct money
  deductMoney: (value, count) =>
    set((state) => {
      const existingDenomination = state.denominations.find(
        (denomination) => denomination.value === value
      );

      if (!existingDenomination || existingDenomination.count < count) {
        console.warn("Insufficient denomination or count.");
        return state; // Prevent invalid deductions
      }

      return {
        total: state.total - value * count,
        denominations: state.denominations
          .map((denomination) =>
            denomination.value === value
              ? { ...denomination, count: denomination.count - count }
              : denomination
          )
          .filter((denomination) => denomination.count > 0), // Remove denominations with zero count
      };
    }),

  // Reset the total and denominations
  resetMoney: () => set({ total: 0, denominations: [] }),

  // Submenu state
  subMenuPage: "overview",
  setSubMenuPage: (value: string) => set({ subMenuPage: value }),
}));
