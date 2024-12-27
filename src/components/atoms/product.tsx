import { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import ImageDisplay from "./image";
import { useRouter } from "next/navigation";

export type ProductType = {
  id: string;
  name: string;
  price: string;
  description: string;
  litrage: string;
  url: string;
  currency: {
    name: string;
    exchangeRate: number;
  };
  productCategory?: {
    name: string;
  };
};

export const ProductCard = (product: ProductType) => {
  const router = useRouter();
  return (
    <div className="bg-white w-fit rounded-xl shadow-lg p-6 max-md:p-3 hover:shadow-xl transition duration-300 max-md:w-full max-md:h-80 max-md:border max-md:border-green-500 flex flex-col justify-between">
      <div className="w-72 bg-green-100 rounded-lg mb-4 overflow-hidden max-md:w-full max-md:h-1/2">
        <ImageDisplay
          src={product.url}
          alt={"image d'un jus"}
          className="w-full h-auto"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {product.name}
      </h3>
      <p className="text-gray-600">
        {product.productCategory
          ? product.productCategory.name
          : product.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-green-600 font-bold text-lg">
          {product.price} {product.currency.name}
        </span>
        <span className="flex gap-3 items-center">
          <button className="text-green-600 px-4 py-2 rounded-lg bg-transparent transition hover:text-green-700">
            <FaCartPlus size={25} />
          </button>
          <button
            onClick={() => router.push(`products/${product.id}`)}
            className="hidden bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            voir
          </button>
        </span>
      </div>
    </div>
  );
};
