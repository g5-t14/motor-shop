import { ButtonProps } from "./interface";

export const BlackButton = ({ children, size, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`bg-grey0 border-grey0 hover:bg-grey1 hover:border-grey1 ${
        size === "big" ? "btn-big" : "btn-medium"
      }`}
    >
      {children}
    </button>
  );
};
