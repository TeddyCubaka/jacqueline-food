// File: components/Cart.tsx

import React from "react";
import CartItem from "./cart-item";
import { useCartStore } from "@/store/cart-store";

const Cart: React.FC = () => {
  const { isOpen, items, total, itemCount, toggleCart, clearCart } =
    useCartStore();

  return (
    <>
      <button
        onClick={toggleCart}
        className="z-50 fixed bottom-4 right-4 p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <div className="relative">
          <svg
            className="w-10 h-10"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
      </button>

      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Panier ({itemCount})</h2>
              <button
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Votre panier est vide
              </div>
            ) : (
              items.map((item) => <CartItem key={item.id} item={item} />)
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-medium">{total.toFixed(2)} fc</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    console.log("Checkout");
                  }}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Passer la commande
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCart}
        />
      )}
    </>
  );
};

export default Cart;
