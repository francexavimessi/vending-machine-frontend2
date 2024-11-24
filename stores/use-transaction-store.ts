import {create} from "zustand";

// Define types for the store
interface Product {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Transaction {
  transactionId: string;
  timestamp: string;
  validatedProducts: Product[];
  totalCost: number;
  totalPaid: number;
  change: any[];
}

interface Store {
  transaction: Transaction | null; // Can be null until initialized
  setTransaction: (transaction: Transaction) => void;
  resetTransaction: () => void;
}

// Create the store using Zustand
export const useTransactionStore = create<Store>((set) => ({
  transaction: null, // Initial state is null
  setTransaction: (transaction) => set({ transaction }),
  resetTransaction: () => set({ transaction: null }),
}));
