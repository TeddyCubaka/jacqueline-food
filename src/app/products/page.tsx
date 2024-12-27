"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ResponseData } from "@/types/reponse-data.type";
import { FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";
import { ProductCard, ProductType } from "@/components/atoms/product";

interface ProductCategory {
  id: string;
  name: string;
  products: ProductType[];
}

const ProductCategoryCard = (category: ProductCategory) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold !sticky">{category.name}</h2>
      <div className="flex flex-wrap gap-5 max-md:grid max-md:grid-cols-2">
        {category.products.map((product: ProductType) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default function ProductsPage() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "api/core/productCategory?include__products__include__currency=true",
          {
            method: "GET",
          }
        );

        const result: ResponseData = await res.json();
        if (!res.ok) {
          if ("message" in result) setError(result.message);
          else throw new Error(`HTTP error! status: ${res.status}`);
        }

        setData(result);
        console.log(result);
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
        <Link href={"/"}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center gap-5 text-green-500 ">
            {" "}
            <FaChevronLeft size={30} /> Nos produits
          </h2>
        </Link>
        <div className="flex flex-col justify-center gap-8">
          {data?.data.map((category: ProductCategory) => (
            <ProductCategoryCard {...category} key={category.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
