interface ButtonProps {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const BlackButtonBig = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className="bg-grey0 text-whiteFixed text-btgBigF font-600 h-btgBigH px-btnBigPad rounded-4 hover:bg-grey1 disabled:bg-grey6"
    >
      {children}
    </button>
  );
};

const BlackButtonMedium = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className="bg-grey0 text-whiteFixed text-btgMedF font-600 h-btgMedH px-btnMedPad rounded-4 hover:bg-grey1"
    >
      {children}
    </button>
  );
};

export { BlackButtonBig, BlackButtonMedium };
