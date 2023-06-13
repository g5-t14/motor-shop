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
        <label htmlFor={id}>{label}</label>
        <input
          className="box-border h-[40px] w-[100%] outline-none p-0 16px 
          border-solid 
          border-2px 
          rounded-2xl"
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







