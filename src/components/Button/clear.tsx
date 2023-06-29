import { ButtonProps } from "./interface";

export const ClearButton = ({ children, size, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`bg-none border-none text-grey0 hover:bg-grey8 hover:border-grey8 ${
        size === "big" ? "btn-big" : "btn-medium"
      }`}
    >
      {children}
    </button>
  );
};
