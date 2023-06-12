import { ButtonProps } from "./interface";

export const PurpleOpacityButton = ({ children, size, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`bg-brand4 border-brand4 text-brand1 ${
        size === "big" ? "btn-big" : "btn-medium"
      }`}
    >
      {children}
    </button>
  );
};
