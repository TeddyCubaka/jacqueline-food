import React, { useEffect, useState } from "react";

export type InputValueType = { errorMessage: string; value: any };

export type InputPropsType = {
  label: string;
  type?: "text" | "number" | "select" | "date" | "file" | "float";
  id?: string;
  placeholder: string;
  value: InputValueType;
  setValue: (value: InputValueType) => void;
  options?: Array<{ label: string; value: string | number }>;
  endpoint?: string;
  formatData?: (data: any) => Array<{ label: string; value: string | number }>;
};

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
    const newValue = type === "number" ? +e.target.value || 0 : e.target.value;
    setValue({ ...value, value: newValue });
  };

  return (
    <div className="w-full">
      <label
        className="mb-3 text-sm font-medium text-black"
        htmlFor={id || label}
      >
        {label}
      </label>
      <div className="relative">
        {type === "select" ? (
          <select
            className="w-full rounded border border-stroke bg-gray px-5 py-2 text-black focus:border-primary focus-visible:outline-none"
            name={label}
            id={id}
            value={value?.value}
            onChange={handleChange}
          >
            {dynamicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
