import { IconEyeClose, IconEyeOpen } from "@/assets/icons/IconEye";
import { IconCalendar } from "@/assets/icons/IconCalendar";
import IconWarning from "@/assets/icons/IconWarning";
import { useState } from "react";
import "./input.scss";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  props?: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
  error?: string;
  touch?: boolean;
  password?: boolean;
  placeholder?: string;
  disabled?: boolean;
  showWarning?: boolean;
  showErrorMessage?: boolean;
  type?: string;
}

export const Input = ({
  value,
  onChange,
  props,
  error,
  touch,
  password,
  placeholder,
  disabled = false,
  showWarning = false,
  showErrorMessage,
  type = "text",
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // Función para formatear la fecha a YYYY/MM/DD mientras se escribe
  const formatDate = (input: string) => {
    const digits = input.replace(/\D/g, ""); // elimina caracteres que no sean dígitos
    let formatted = "";
    if (digits.length > 0) {
      formatted = digits.substring(0, 4);
    }
    if (digits.length >= 5) {
      formatted += "/" + digits.substring(4, 6);
    }
    if (digits.length >= 7) {
      formatted += "/" + digits.substring(6, 8);
    }
    return formatted;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedValue = formatDate(rawValue);
    onChange(formattedValue);
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(event.target.value);
  };

  return (
    <div className="mainInputContainer">
      <div
        className="mainInput"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          height: type === "textarea" ? "56px" : "auto",
        }}
      >
        {type === "textarea" ? (
          <textarea
            {...props}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            value={value}
            onChange={handleTextChange}
          />
        ) : type === "date" ? (
          <div className="inputDate">
            <input
              {...props}
              placeholder={placeholder + " (aaaa/mm/dd"}
              disabled={disabled}
              autoComplete="off"
              value={value}
              onChange={handleDateChange}
              type="text"
            />
            <span className="calendarIcon">
              <IconCalendar width="24" height="24" />
            </span>
          </div>
        ) : (
          <input
            {...props}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            value={value}
            onChange={handleTextChange}
            type={password ? (showPassword ? "text" : "password") : type}
          />
        )}
        {password && (
          <picture
            onClick={() => setShowPassword(!showPassword)}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "15px",
            }}
          >
            {showPassword ? <IconEyeClose /> : <IconEyeOpen />}
          </picture>
        )}
        {showWarning && (
          <div
            style={{
              position: "absolute",
              right: "-30px",
              top: "13px",
              visibility: error && touch ? "visible" : "hidden",
            }}
          >
            <IconWarning />
          </div>
        )}
      </div>
      {showErrorMessage && (
        <p
          className="errorText"
          style={{
            visibility: error && touch ? "visible" : "hidden",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
