// File: stores/cartStore.ts

import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export interface CartState {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  itemCount: number;

  // Actions
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  isOpen: false,
  items: [],
  total: 0,
  itemCount: 0,

  toggleCart: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        updatedItems = [...state.items, { ...item, quantity: 1 }];
      }

      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);

      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      };
    }),

  clearCart: () =>
    set(() => ({
      items: [],
      total: 0,
      itemCount: 0,
    })),
}));
