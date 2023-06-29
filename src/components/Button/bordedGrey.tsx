import { ButtonProps } from "./interface";

export const BorderGreyButton = ({ children, size, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`bg-none border-grey4 text-grey0 hover:bg-grey1 hover:border-grey1 hover:text-whiteFixed ${
        size === "big" ? "btn-big" : "btn-medium"
      }`}
    >
      {children}
    </button>
  );
};
