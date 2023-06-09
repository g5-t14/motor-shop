import { ReactNode } from "react";

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  register?: object;
  error?: ReactNode
}

export function TextArea({ id, label, placeholder, defaultValue, register, error }: InputProps) {
  return (
    <fieldset className="relative flex flex-col gap-2 border-none">
      <label htmlFor={id} className="font-500 text-sm text-grey0">
        {label}
      </label>
      <textarea
        className="h-20 w-full px-6 py-4 resize-none outline-none bg-whiteFixed text-grey1 rounded-4 border-2 border-grey4 hover:bg-grey9 focus:border-brand1"
        placeholder={placeholder}
        id={id}
        defaultValue={defaultValue}
        {...register}
      />
      {error}
    </fieldset>
  );
}
