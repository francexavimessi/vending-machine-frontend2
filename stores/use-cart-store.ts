import { create } from "zustand";
interface ICartItem {
  id: string; // Unique identifier for the product
  name: string; // Product name
  price: number; // Product price
  quantity: number; // Quantity of the product in the cart
}

interface ICartStore {
  cart: ICartItem[]; // Array of cart items
  addToCart: (item: ICartItem) => void; // Function to add an item to the cart
  removeFromCart: (id: string) => void; // Function to remove an item from the cart
  updateQuantity: (id: string, quantity: number) => void; // Function to update quantity
  clearCart: () => void; // Function to clear the cart
  decrementQuantity: (id: string) => void
  incrementQuantity: (id: string) => void
  subMenuPage: string;
  setSubMenuPage: (value: string) => void;
}

export const useCartStore = create<ICartStore>((set) => ({
  cart: [],

  // Add item to cart
  addToCart: (item: ICartItem) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If item exists, update its quantity
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        };
      }
      // Add new item to the cart
      return { cart: [...state.cart, item] };
    }),

  // Remove item from cart
  removeFromCart: (id: string) =>
    set((state) => ({
      cart: state.cart.filter((cartItem) => cartItem.id !== id),
    })),

  // Update item quantity
  updateQuantity: (id: string, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      ),
    })),

  // Increment item quantity
  incrementQuantity: (id: string) =>
    set((state) => ({
      cart: state.cart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ),
    })),

  // Decrement item quantity
  decrementQuantity: (id: string) =>
    set((state) => ({
        cart: state.cart
            .map((cartItem) =>
                cartItem.id === id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            )
            .filter((cartItem) => cartItem.quantity > 0), // Remove item if quantity is 0
    })),

  // Clear the cart
  clearCart: () => set({ cart: [] }),

  subMenuPage: "all",
  setSubMenuPage: (value: string) => set({ subMenuPage: value }),
}));
