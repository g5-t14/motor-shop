import { ButtonProps } from "./interface";

export const GreenButton = ({ children, size, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`bg-sucess3 border-sucess3 text-sucess1 hover:bg-sucess2 hover:border-sucess2 ${
        size === "big" ? "btn-big" : "btn-medium"
      }`}
    >
      {children}
    </button>
  );
};
