import Image from "next/image";
import mangue33cl from "@/../public/images/jus/mangue.jpg";
import tanagawizi33cl from "@/../public/images/jus/tangawizi-33cl.jpg";
import ananas33cl from "@/../public/images/jus/ananas-33cl.jpg";
import { useEffect, useState } from "react";
import { ResponseData } from "@/types/reponse-data.type";

type ProductType = {
  id: number;
  name: string;
  price: string;
  description: string;
  litrage: string;
  url: string;
};

const ProductCard = (product: ProductType) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="h-60 bg-green-100 rounded-lg mb-4 overflow-hidden">
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
          {product.price}
        </span>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Commander
        </button>
      </div>
    </div>
  );
};
export default function Products() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/core/product`, {
          method: "GET",
        });

        const result: ResponseData = await res.json();
        if (!res.ok) {
          if ("message" in result) setError(result.message);
          else throw new Error(`HTTP error! status: ${res.status}`);
        }

        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Nos Jus Frais
        </h2>
        <div className="flex justify-center gap-8">
          {data?.data.map((product: ProductType) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
