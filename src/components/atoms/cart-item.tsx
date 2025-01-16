// File: components/CartItem.tsx

import React from "react";
import { useCartStore, CartItem as CartItemType } from "@/store/cart-store";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
      )}
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">{item.price.toFixed(2)} fc</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() =>
              updateQuantity(item.id, Math.max(0, item.quantity - 1))
            }
            className="px-2 py-1 border rounded hover:bg-gray-100"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 border rounded hover:bg-gray-100"
          >
            +
          </button>
          <button
            onClick={() => removeItem(item.id)}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
