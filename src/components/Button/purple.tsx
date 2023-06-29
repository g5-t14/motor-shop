import { ButtonProps } from "./interface";

export const PurpleButton = ({ children, size, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`bg-brand1 border-brand1 hover:bg-brand2 hover:border-brand2 ${
        size === "big" ? "btn-big" : "btn-medium"
      }`}
    >
      {children}
    </button>
  );
};
