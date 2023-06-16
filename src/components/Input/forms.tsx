import { ReactNode } from "react";

interface InputProps {
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    register?: object;
    defaultValue?: string;
    loading?: boolean;
    error?: ReactNode;
  }
  

  export function InputForm({
    id,
    label,
    type,
    placeholder,
    register,
    defaultValue,
    loading,
    error,
  }: InputProps) {
    return (
      <fieldset className="flex  flex-col relative gap-2 border-none">
        <label className="font-bold" htmlFor={id}>{label}</label>
        <input
          className="h-12 w-full outline-none bg-whiteFixed text-grey1 rounded-4 border-2 border-grey4 hover:bg-grey9 focus:border-brand1 px-4"
          type={type}
          placeholder={placeholder}
          id={id}
          {...register}
          defaultValue={defaultValue}
          disabled={loading}
        />
        {error}
      </fieldset>
    );
  }







