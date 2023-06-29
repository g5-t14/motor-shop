import { ButtonProps } from "./interface";

export const RedButton = ({ children, size, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`bg-alert3 border-alert3 text-alert1 hover:bg-alert2 hover:border-alert2 ${
        size === "big" ? "btn-big" : "btn-medium"
      }`}
    >
      {children}
    </button>
  );
};
