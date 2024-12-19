import { InputType } from "@/app/api/core/[model]/config-data";
import React, { useEffect, useState } from "react";

export type InputValueType = { errorMessage: string; value: any };

export interface InputPropsType extends InputType {
  id?: string;
  value: InputValueType;
  setValue: (value: InputValueType) => void;
}

const Input = (props: InputPropsType) => {
  const {
    label,
    type,
    id,
    placeholder,
    value,
    setValue,
    options,
    endpoint,
    formatData,
  } = props;

  const [dynamicOptions, setDynamicOptions] = useState<
    Array<{ label: string; value: string | number }>
  >(options || []);

  useEffect(() => {
    const fetchOptions = async () => {
      if (endpoint) {
        try {
          const response = await fetch(endpoint);
          const data = await response.json();
          const formattedData = formatData ? formatData(data.data) : data.data;
          setDynamicOptions(formattedData);
        } catch (error: any) {
          console.log("Error fetching options:", String(error.message));
        }
      }
    };

    fetchOptions();
  }, [endpoint, formatData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let newValue: string | number | boolean =
      type === "number" ? +e.target.value || 0 : e.target.value;
    if (type === "boolean") newValue = true;
    setValue({ ...value, value: newValue });
  };

  useEffect(() => {
    if (type == "boolean") setValue({ ...value, value: value.value || false });
  }, [type]);

  return (
    <div className="w-full">
      <label
        className={
          "mb-3 text-sm font-medium text-black " +
          (type === "boolean" ? "flex gap-5 items-center" : "")
        }
        htmlFor={id || label}
      >
        {label}
      </label>
      <div className="">
        {type === "select" ? (
          <select
            className="w-full rounded border border-stroke bg-gray px-5 py-2 text-black focus:border-primary focus-visible:outline-none"
            name={label}
            id={id}
            value={value?.value}
            onChange={handleChange}
          >
            <option value={""}>---</option>
            {dynamicOptions.map((option) => (
              <option key={String(option.value)} value={option.value}>
                {String(option.label)}
              </option>
            ))}
          </select>
        ) : type === "boolean" ? (
          <input
            type="checkbox"
            name={label}
            id={id}
            checked={value.value}
            onChange={handleChange}
            className="h-5 w-5 rounded-full border-gray-300 text-primary focus:ring-primary"
          />
        ) : (
          <input
            className="w-full rounded border border-stroke bg-gray px-5 py-2 text-base text-black focus:border-primary focus-visible:outline-none"
            type={type}
            name={label}
            placeholder={placeholder}
            id={id}
            value={value?.value}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
