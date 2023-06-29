import { ReactNode } from "react";

interface InputProps {
  id: string;
  label: string;
  children: ReactNode;
  register?: object;
  disabled?: boolean;
}

export function Select({ id, label, children, ...rest }: InputProps) {
  return (
    <fieldset className="flex flex-col gap-2 border-none">
      <label htmlFor={id} className="font-500 text-sm text-grey0">
        {label}
      </label>
      <select
        className="h-12 w-full outline-none bg-whiteFixed text-grey3 rounded-4 border-2 border-grey4 hover:bg-grey9 focus:border-brand1 px-4"
        id={id}
        {...rest}
      >
        {children}
      </select>
    </fieldset>
  );
}
