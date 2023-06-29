export interface ButtonProps {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size: "big" | "medium";
}
