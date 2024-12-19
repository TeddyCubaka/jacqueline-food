"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ResponseData } from "@/types/reponse-data.type";
import { JsonErrorAlert } from "@/components/atoms/display-error";
import { Button } from "@mui/material";
import Input, { InputPropsType, InputValueType } from "@/components/form/input";
import { FormatModelData } from "@/utils/format-select-options";
import Loader from "@/components/atoms/loader";

export default function DashboardPage({ params }: { params: any }) {
  const { path, id } = useParams();
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{
    code: number;
    message: string;
    data: { [key: string]: any };
    status?: "error" | "success";
  } | null>(null);

  const [form, setForm] = useState<InputPropsType[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/core/${path}/${id}`, {
          method: "GET",
        });

        const result: ResponseData = await res.json();
        if (!res.ok) {
          if ("message" in result)
            setError({
              code: result.code,
              message: result.message,
              data: result,
            });
          else throw new Error(`HTTP error! status: ${res.status}`);
        }

        setData(result);
        if (result.meta?.form) {
          const formatModelData = new FormatModelData();

          const initialFormData = result.meta.form.reduce(
            (acc: { [key: string]: any }, field) => {
              acc[field.proprety] = result.data[field.proprety] || "";
              return acc;
            },
            {}
          );

          setFormData(initialFormData);

          setForm(
            result.meta?.form.map((field) => {
              if (String(path) in formatModelData) {
                field.formatData =
                  formatModelData[path as keyof typeof formatModelData][
                    field.proprety
                  ];
              }
              return {
                type: field.type,
                endpoint: field.endpoint,
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
  }, [path, id]);

  if (loading) return <Loader />;
  if (error !== null)
    return (
      <div className="flex flex-col gap-5 w-fit max-w-[80%] max-h-[90%] h-fit overflow-y-auto bg-white m-auto p-5 rounded-xl">
        <JsonErrorAlert
          message={error.message}
          status={error.status || "error"}
          errorDetails={error.data}
          timestamp=""
          code={error.code}
          stack={true}
        />
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
            onClick={() => {
              if (error.status && error.code < 399) router.back();
              router.refresh();
            }}
          >
            {error.status && error.code < 399 ? "retour" : "rafraichir"}
          </button>
        </div>
      </div>
    );

  return (
    <div className="h-screen flex p-5 w-full bg-gray-200">
      <form
        className="p-6 max-w-[100%] w-full flex h-fit flex-col gap-5"
        onSubmit={async (event) => {
          event.preventDefault();
          let response: Response = await fetch(`/api/core/${path}/${id}`, {
            method: "put",
            body: JSON.stringify(formData),
          });
          const data: ResponseData = await response.json();

          setError({
            code: data.code,
            message: data.message,
            data: data,
            status: data.code > 399 ? "error" : "success",
          });
        }}
      >
        <div className="rounded-lg flex justify-between bg-gray-50 border p-5">
          <h1 className="text-lg font-semibold">
            {data?.meta
              ? data?.meta?.verboseName.single[0].toLocaleUpperCase() +
                data?.meta?.verboseName.single.slice(1)
              : ""}
          </h1>
          <div>
            <Button
              className="!shadow-none !rounded-none"
              variant="contained"
              color="inherit"
              onClick={() => {
                router.back();
              }}
            >
              annuler
            </Button>
            <Button
              className="!shadow-none !rounded-none"
              variant="contained"
              color="primary"
              type="submit"
            >
              Modifier
            </Button>
            <Button
              className="!shadow-none !rounded-none"
              variant="contained"
              color="error"
            >
              Supprimer
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-5 flex flex-col gap-3">
          {form.map((field) => (
            <Input {...field} key={field.label} />
          ))}
        </div>
      </form>
    </div>
  );
}
