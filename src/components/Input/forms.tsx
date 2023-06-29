interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  register?: object;
  defaultValue?: string;
  loading?: boolean;
}

export function InputForm({
  id,
  label,
  type,
  placeholder,
  register,
  defaultValue,
  loading,
}: InputProps) {
  return (
    <fieldset className="flex  flex-col relative gap-2 border-none">
      <label className="font-bold text-[14px]" htmlFor={id}>
        {label}
      </label>
      <input
        className="box-border h-[45px] w-[100%] outline-none p-0 16px 
          border-solid 
          border-[2px] 
          rounded 
          p-[10px]
          mb-[24px]"
        type={type}
        placeholder={placeholder}
        id={id}
        {...register}
        defaultValue={defaultValue}
        disabled={loading}
      />
    </fieldset>
  );
}
