"use client";
import { useEffect, useState } from "react";
import Input, { InputPropsType } from "../form/input";
import { ResponseData } from "@/types/reponse-data.type";
import Loader from "./loader";
import { JsonErrorAlert } from "./display-error";
import { FormatModelData } from "@/utils/format-select-options";
import { InputType } from "@/app/api/core/[model]/config-data";
import { useRouter } from "next/navigation";

const formular: InputType[] = [
  //   {
  //     label: "client",
  //     proprety: "clientId",
  //     type: "select",
  //     placeholder: "",
  //     endpoint: "/api/core/client",
  //     formatData: (data) => {
  //       return data.map((value: { fullName: string; id: string }) => ({
  //         label: value.fullName,
  //         value: value.id,
  //       }));
  //     },
  //   },
  {
    label: "numero de téléphone",
    proprety: "phone",
    type: "text",
    placeholder: "Ex : +243 995 867 384",
  },
  {
    label: "Nom complet",
    proprety: "fullName",
    type: "text",
    placeholder: "Ex : hesbay",
  },
  {
    label: "date pour la reservation",
    proprety: "date",
    type: "date",
    placeholder: "votre date ici",
  },
  {
    label: "type de service",
    proprety: "serviceType",
    type: "select",
    placeholder: "",
    options: [
      { label: "professionnel", value: "professionnel" },
      { label: "privé", value: "privé" },
    ],
  },
  {
    label: "Lieux",
    proprety: "place",
    type: "select",
    placeholder: "",
    options: [
      { label: "restaurant", value: "restaurant" },
      { label: "hotel", value: "hotel" },
      { label: "evenement", value: "evenement" },
      { label: "à la maison", value: "à la maison" },
      { label: "au bureau", value: "au bureau" },
    ],
  },
  {
    label: "description",
    proprety: "description",
    type: "text",
    placeholder: "votre date ici",
  },
];

export const BookingComponent = () => {
  const [form, setForm] = useState<InputPropsType[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ResponseData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await fetch(`/api/core/booking/head`, {
        //   method: "GET",
        // });

        // const result: ResponseData = await res.json();
        // if (!res.ok) {
        //   if ("message" in result)
        //     setError({
        //       code: result.code,
        //       message: result.message,
        //       data: result,
        //     });
        //   else throw new Error(`HTTP error! status: ${res.status}`);
        // }

        // if (result.data !== null) {
        if (formular) {
          const formatModelData = new FormatModelData();

          const initialFormData = formular.reduce(
            (acc: { [key: string]: any }, field: InputType) => {
              acc[field.proprety] =
                formular[field.proprety as keyof typeof formular] || "";
              return acc;
            },
            {}
          );

          setFormData(initialFormData);

          setForm(
            formular.map((field: InputType) => {
              field.formatData = formatModelData.booking[field.proprety];

              return {
                type: field.type,
                endpoint: field.endpoint,
                options: field.options,
                label: field.label,
                proprety: field.proprety,
                placeholder: field.placeholder,
                formatData: field.formatData,
                setValue: (value: { errorMessage: string; value: any }) => {
                  setFormData((prev) => ({
                    ...prev,
                    [field.proprety]: value.value,
                  }));
                  setForm((prev) =>
                    prev.map((subField) => {
                      if (subField.proprety == field.proprety)
                        return {
                          ...subField,
                          value: value,
                        };
                      return subField;
                    })
                  );
                },
                value: {
                  value: initialFormData[field.proprety],
                  errorMessage: "",
                },
              };
            })
          );
        }
      } catch (err: any) {
        setError({
          code: err.code,
          message: err.message,
          data: { error: String(err) },
        });
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

  return (
    <div className="p-5 flex gap-5">
      <div className="w-1/3 bg-red-50 h-96 max-md:hidden flex justify-center items-center">pub here</div>
      <div className="w-full flex flex-col gap-5">
        <h2 className="text-lg font-bold">Reserver une degustation</h2>
        <form className="flex flex-col gap-5">
          {form.map((field) => (
            <Input {...field} key={field.proprety} />
          ))}
          <button
            onClick={() => {}}
            className=" bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            soumettre
          </button>
        </form>
      </div>
    </div>
  );
};
