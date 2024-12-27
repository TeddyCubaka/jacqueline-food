"use client";
import { JsonErrorAlert } from "@/components/atoms/display-error";
import ImageDisplay from "@/components/atoms/image";
import Loader from "@/components/atoms/loader";
import { ProductType } from "@/components/atoms/product";
import { ResponseData } from "@/types/reponse-data.type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";

const ViewProductPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<ResponseData | null>(null);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ResponseData | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/core/product/${id}`, {
          method: "GET",
        });

        const result: ResponseData = await res.json();
        if (!res.ok) {
          if ("message" in result) setError(result);
          else throw new Error(`HTTP error! status: ${res.status}`);
        }

        setData(result);
        if (result.data == null)
          setError({
            code: 404,
            message: "aucunne donnée trouvée pour ce produit",
            "dev-meta": {
              message: "front customised message",
            },
          });
        setProduct(result.data);
      } catch (err: any) {
        setError(err.message);
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
          errorDetails={error}
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

  return product ? (
    <div className="bg-white h-3/4 w-1/2 max-md:w-full max-md:h-full p-5 max-md:p-3 md:rounded-xl flex flex-col gap-5">
      <div className="flex items-center">
        <span onClick={() => router.back()} className="flex items-center ">
          <span className="md:hidden flex items-center gap-4 cursor-pointer">
            <FaChevronLeft size={20} /> retour
          </span>
          <span className="max-md:hidden cursor-pointer">
            {" "}
            <MdOutlineClose size={30} />{" "}
          </span>
        </span>
      </div>
      <div>
        <div className="h-60 w-72 bg-green-100 rounded-lg mb-4 overflow-hidden max-md:w-full md:w-1/2 ma:h-3/4">
          {product.url && product.url.length > 0 ? (
            <ImageDisplay
              src={product.url}
              alt={"image d'un jus"}
              className="w-full h-auto"
            />
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  ) : (
    false
  );
};

export default ViewProductPage;
