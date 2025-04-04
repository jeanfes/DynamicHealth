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
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    design?: "buttonCyan" | "buttonYellow" | "buttonWhite" | "buttonRed";
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
    type = "button",
    design = "buttonCyan",
}: ButtonProps) => {
    return (
        <button
            className={`mainButton ${design}`}
            disabled={loading && loading}
            onClick={onClick}
            id={id}
            type={type}
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
