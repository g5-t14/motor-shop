import { ButtonProps } from "./interface";

export const GreyButton = ({ children, size, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`bg-grey6 border-grey6 hover:bg-grey5 hover:border-grey5 text-grey2 ${
        size === "big" ? "btn-big" : "btn-medium"
      }`}
    >
      {children}
    </button>
  );
};
