"use client";
import Image from "next/image";
import mangue33cl from "@/../public/images/jus/mangue.jpg";
import tanagawizi33cl from "@/../public/images/jus/tangawizi-33cl.jpg";
import ananas33cl from "@/../public/images/jus/ananas-33cl.jpg";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table";
import { FiDownload, FiPlus } from "react-icons/fi";
import { useParams } from "next/navigation";
import { ResponseData } from "@/types/reponse-data.type";
import { DisplayColumn } from "@/app/api/core/[model]/config-data";

// type ProductType = {
//   id: number;
//   name: string;
//   price: string;
//   description: string;
//   litrage: string;
//   url: string;
// };

// const products: ProductType[] = [
//   {
//     id: 1,
//     name: "Jus de tangawizi",
//     price: "1.7 $",
//     description: "Tangawizi, citron et menthe",
//     litrage: "33cl",
//     url: tanagawizi33cl.src,
//   },
//   {
//     id: 2,
//     name: "Jus de mange",
//     price: "1.7 $",
//     description: "Épinards, céleri, pomme et gingembre",
//     litrage: "33cl",
//     url: mangue33cl.src,
//   },
//   {
//     id: 3,
//     name: "Jus d'ananas",
//     price: "1.7 $",
//     description: "100% Ananas",
//     litrage: "33cl",
//     url: ananas33cl.src,
//   },
// ];

// const productColumns = [
//   { key: "id", header: "id" },
//   { key: "name", header: "name" },
//   { key: "price", header: "price" },
//   { key: "description", header: "description" },
//   { key: "litrage", header: "litrage" },
//   { key: "url", header: "url" },
// ];

const actions = (
  <div className="flex gap-2">
    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2">
      <FiPlus />
      Ajouter
    </button>
    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
      <FiDownload />
      Exporter
    </button>
  </div>
);

export default function InvoicesPage({ params }: { params: any }) {
  const { path } = useParams();
  const [data, setData] = useState<ResponseData | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/core/${path}`, {
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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-[100%]">
      <DataTable
        data={data?.data || []}
        columns={data?.meta?.displayColumns || []}
        searchable
        searchKeys={data?.meta?.searchKeys}
        selectable
        actions={actions}
      />
    </div>
  );
}
