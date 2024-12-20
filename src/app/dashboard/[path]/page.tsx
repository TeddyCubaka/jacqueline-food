"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table";
import { FiDownload, FiPlus } from "react-icons/fi";
import { useParams } from "next/navigation";
import { ResponseData } from "@/types/reponse-data.type";
import { Card, Modal } from "@mui/material";
import Input, { InputPropsType } from "@/components/form/input";
import { InputType } from "@/app/api/core/[model]/config-data";
import Loader from "@/components/atoms/loader";
import { AlertStatus, JsonErrorAlert } from "@/components/atoms/display-error";
import { FormatModelData } from "@/utils/format-select-options";

const Actions = (props: {
  modelName: string | string[] | undefined;
  refreshData: () => void;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [form, setForm] = useState<InputPropsType[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [apiData, setApiData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [recap, setRecap] = useState<{
    status: AlertStatus;
    message: string;
    meta: any;
    code?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/core/${props.modelName}/head`, {
        method: "GET",
      });

      const result: ResponseData = await res.json();
      if (!res.ok) {
        setRecap({
          message: result.message,
          meta: result,
          status: "error",
          code: "ERREUR DE LA LECTURE DES DONNEES",
        });
        if ("message" in result) setErrorMessage(result.message);
        else throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: InputType[] = result.data;
      const formatModelData = new FormatModelData();
      setForm(
        data.map((field) => {
          if (String(props.modelName) in formatModelData) {
            field.formatData =
              formatModelData[props.modelName as keyof typeof formatModelData][
                field.proprety
              ];
          }
          return {
            type: field.type || "text",
            endpoint: field.endpoint,
            label: field.label,
            placeholder: field.placeholder,
            formatData: field.formatData,
            proprety: field.proprety,
            setValue: (value) => {
              setFormData((prev) => ({ ...prev, [field.proprety]: value }));
              setApiData((prev) => ({
                ...prev,
                [field.proprety]: value.value,
              }));
            },
            value: {
              errorMessage: "",
              value: formData[field.proprety],
            },
          };
        })
      );
    } catch (error: any) {
      setErrorMessage(error.message);
      setRecap({
        message: "Une erreur est survenue",
        meta: error,
        status: "error",
        code: "ERREUR DE LA LECTURE DES DONNEES",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setOpenModal(true);
            fetchData();
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
        >
          <FiPlus />
          Ajouter
        </button>
        <button
          onClick={props.refreshData}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
        >
          <FiDownload />
          Refraichir
        </button>
        {/* <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
          <FiDownload />
          Exporter
        </button> */}
      </div>
      <Modal
        open={openModal}
        onClose={() => {
          setForm([]);
          setFormData({});
          setLoading(true);
          setRecap(null);
          setErrorMessage("");
          setOpenModal(false);
          setOpenModal(false);
        }}
        className="flex justify-center items-center"
      >
        <Card className="w-1/2 min-h-[30%] h-fit max-h-[80%] p-5 flex flex-col gap-5 justify-between overflow-y-auto">
          <h3 className="text-lg font-medium">{props.modelName}</h3>
          <div className="flex justify-center items-center h-full">
            {loading ? <Loader /> : false}
            {recap != null ? (
              <div className="flex flex-col gap-5 w-full h-full overflow-y-auto">
                <JsonErrorAlert
                  message={errorMessage || recap.message}
                  status={recap.status}
                  errorDetails={recap.meta}
                  timestamp=""
                  code={recap.code || "ERROR"}
                  stack={true}
                />
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
                    type="button"
                    onClick={() => {
                      setRecap(null);
                    }}
                  >
                    retour
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
                    onClick={() => {
                      setForm([]);
                      setFormData({});
                      setLoading(true);
                      setRecap(null);
                      setErrorMessage("");
                      setOpenModal(false);
                      props.refreshData();
                    }}
                  >
                    Terminer
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="w-full flex  flex-col gap-2.5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const response = await fetch(
                      `/api/core/${props.modelName}`,
                      {
                        method: "post",
                        body: JSON.stringify(apiData),
                      }
                    );
                    const result = await response.json();
                    setRecap({
                      message: result.message,
                      meta: result,
                      status: +result.code < 202 ? "success" : "error",
                      code:
                        +result.code < 202
                          ? "CREATION REUSSIE"
                          : "ERREUR DE LA CREATION",
                    });
                  } catch (error: any) {
                    setRecap({
                      message: error.message,
                      meta: error.message,
                      status: "error",
                      code: "ERREUR SERVEUR",
                    });
                  }
                }}
              >
                {form.map((field) => (
                  <Input {...field} key={field.label} />
                ))}
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
                    type="button"
                    onClick={() => {
                      setForm([]);
                      setFormData({});
                      setLoading(true);
                      setRecap(null);
                      setErrorMessage("");
                      setOpenModal(false);
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
                    type="submit"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default function DashboardPage({ params }: { params: any }) {
  const { path } = useParams();
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshData, setRefreshData] = useState(true);

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
        setRefreshData(false);
      }
    };
    if (refreshData) fetchData();
  }, [refreshData]);

  if (loading) return <p>Chargement...</p>;
  if (error && data !== null)
    return (
      <div className="flex flex-col gap-5 w-fit h-fit overflow-y-visible bg-white m-auto p-5 rounded-xl">
        <JsonErrorAlert
          message={data.message}
          status={"error"}
          errorDetails={data}
          timestamp=""
          code={data.code}
          stack={true}
        />
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
            onClick={() => {}}
          >
            refresh
          </button>
        </div>
      </div>
    );
  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-[100%] w-full flex  h-full flex-col gap-5">
      <h1 className="text-lg font-semibold">
        {data?.meta?.verboseName.single}
      </h1>
      <DataTable
        data={data?.data || []}
        columns={data?.meta?.displayColumns || []}
        searchable
        searchKeys={data?.meta?.searchKeys}
        selectable
        actions={
          <Actions
            refreshData={() => {
              setRefreshData(true);
              setLoading(true);
            }}
            modelName={path}
          />
        }
      />
    </div>
  );
}
