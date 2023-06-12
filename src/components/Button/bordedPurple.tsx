import { ButtonProps } from "./interface";

export const BorderPurpleButton = ({ children, size, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`bg-none border-brand1 text-brand1 hover:bg-brand4 ${
        size === "big" ? "btn-big" : "btn-medium"
      }`}
    >
      {children}
    </button>
  );
};
