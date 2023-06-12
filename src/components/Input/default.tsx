interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "password" | "email" | "tel" | "number";
  register?: object;
  disabled?: boolean;
}

export function Input({ id, label, type, placeholder, ...rest }: InputProps) {
  return (
    <fieldset className="flex flex-col gap-2 border-none">
      <label htmlFor={id} className="font-500 text-sm text-grey0">
        {label}
      </label>
      <input
        className="h-12 w-full outline-none bg-whiteFixed text-grey1 rounded-4 border-2 border-grey4 hover:bg-grey9 focus:border-brand1 px-4"
        type={type}
        placeholder={placeholder}
        id={id}
        {...rest}
      />
    </fieldset>
  );
}
