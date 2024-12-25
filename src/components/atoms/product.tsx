import Image from "next/image";

export type ProductType = {
  id: number;
  name: string;
  price: string;
  description: string;
  litrage: string;
  url: string;
  currency: {
    name: string;
  };
};

export const ProductCard = (product: ProductType) => {
  return (
    <div className="bg-white w-fit rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="h-60 w-72 bg-green-100 rounded-lg mb-4 overflow-hidden">
        {product.url && product.url.length > 0 ? (
          <Image
            height={200}
            width={200}
            src={product.url}
            alt={"image d'un jus"}
            className="w-full h-auto"
          />
        ) : (
          false
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {product.name}
      </h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-green-600 font-bold text-lg">
          {product.price} {product.currency.name}
        </span>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Commander
        </button>
      </div>
    </div>
  );
};
