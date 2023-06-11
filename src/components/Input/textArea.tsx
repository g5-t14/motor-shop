interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  register?: object;
  disabled?: boolean;
}

export function TextArea({ id, label, placeholder, ...rest }: InputProps) {
  return (
    <fieldset className="flex flex-col gap-2 border-none">
      <label htmlFor={id} className="font-500 text-sm text-grey0">
        {label}
      </label>
      <textarea
        className="h-20 w-full px-6 py-4 resize-none outline-none bg-whiteFixed text-grey1 rounded-4 border-2 border-grey4 hover:bg-grey9 focus:border-brand1"
        placeholder={placeholder}
        id={id}
        {...rest}
      />
    </fieldset>
  );
}
