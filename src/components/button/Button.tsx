import { JSX } from "react";
import "./button.scss";

interface ButtonProps {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  text: string | JSX.Element;
  loading?: boolean;
  maxWidth?: boolean;
  background?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: () => void;
  design?: "primaryButton" | "secondaryButton" | "tertiaryButton";
}

export const Button = ({
  iconLeft,
  iconRight,
  text,
  loading,
  maxWidth = false,
  style,
  id,
  onClick,
  design = "primaryButton",
}: ButtonProps) => {
  return (
    <button
      className={`mainButton ${design}`}
      disabled={loading && loading}
      onClick={onClick}
      id={id}
      style={{
        width: maxWidth ? "100%" : "max-content",
        ...style,
      }}
    >
      {iconLeft}
      {loading ? <p>Cargando...</p> : <p>{text}</p>}
      {iconRight}
    </button>
  );
};
