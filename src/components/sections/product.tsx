"use client";
import { useEffect, useState } from "react";
import { ResponseData } from "@/types/reponse-data.type";
import Link from "next/link";
import { ProductCard, ProductType } from "../atoms/product";
import Loader from "../atoms/loader";
import { JsonErrorAlert } from "../atoms/display-error";
import { useRouter } from "next/navigation";

export default function Products() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ResponseData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/core/product?limit=4`, {
          method: "GET",
        });

        const result: ResponseData = await res.json();
        if (!res.ok) {
          if ("message" in result) setError(result);
          else throw new Error(`HTTP error! status: ${res.status}`);
        }

        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );

  if (error !== null)
    return (
      <div className="flex flex-col gap-5 w-fit max-w-[80%] max-h-[90%] h-fit overflow-y-auto bg-white m-auto p-5 rounded-xl">
        <JsonErrorAlert
          message={error.message}
          status={error.code > 399 ? "error" : "success"}
          errorDetails={error.data}
          timestamp=""
          code={error.code}
          stack={true}
        />
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
            onClick={() => {
              if (error.code < 399) router.back();
              else setError(null);
            }}
          >
            {error.code < 399 ? "retour" : "rafraichir"}
          </button>
        </div>
      </div>
    );

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 flex justify-between">
          <span className="">Nos produits et services</span>
          <Link
            href={"products"}
            className="text-blue-400 underline text-lg w-60"
          >
            voir plus
          </Link>
        </h2>
        <div className="flex justify-center gap-5 max-md:grid max-md:grid-cols-2">
          {data?.data.map((product: ProductType) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
        <button
          className="md:hidden mt-5 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2 justify-center"
          onClick={() => {router.push('products')}}
        >
          voir plus
        </button>
      </div>
    </section>
  );
}
