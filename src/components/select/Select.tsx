import { Box, Select as MuiSelect, MenuItem } from "@mui/material";
import { JSX } from "react";
import "./select.scss";

interface CustomSelectProps {
    options: { value: string; label: string; iconLeft?: JSX.Element; iconRight?: JSX.Element }[];
    value: string;
    onChange: (value: string) => void;
    background?: string;
    iconColor?: string;
    sx?: React.CSSProperties;
    className?: string;
}

export const Select = ({
    options,
    value,
    onChange,
    background = "var(--colorCyan)",
    iconColor = "var(--colorBlack)",
    sx,
    className,
}: CustomSelectProps) => {
    return (
        <MuiSelect
            sx={{
                width: "100%",
                height: "40px",
                background: background,
                backgroundBlendMode: "overlay, normal",
                boxShadow: "0px 0px 8.601px 0px rgba(0, 0, 0, 0.10)",
                backdropFilter: "blur(12.901785850524902px)",
                borderRadius: "8px",
                border: "2px solid var(--colorBlack)",
                textTransform: "capitalize",
                fontFamily: "Mansfield-Bold",
                color: "var(--colorBlack)",
                fontSize: "15px",
                padding: "8px",
                div: {
                    padding: "0",
                },
                ">fieldset": {
                    display: "none",
                },
                ...sx,
            }}
            className={className}
            IconComponent={() => (
                <svg
                    style={{
                        position: "absolute",
                        cursor: "pointer",
                        pointerEvents: "none",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                >
                    <path d="M1 1.66357L7 7.66357L13 1.66357" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
            value={value}
            onChange={(event) => {
                onChange(event.target.value);
            }}
            renderValue={(selected) => {
                const selectedItem = options.find((opt) => opt.value === selected);
                return (
                    <Box display="flex" alignItems="center" gap={2} sx={{ marginLeft: "10px" }}>
                        {selectedItem?.iconLeft && selectedItem.iconLeft}
                        {selectedItem?.label}
                        {selectedItem?.iconRight && selectedItem.iconRight}
                    </Box>
                );
            }}
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: "500px",
                        width: "100%",
                        fontFamily: "Mansfield-Bold",
                        background: background,
                        boxShadow: "0px 0px 8.601px 0px rgba(0, 0, 0, 0.10)",
                        backdropFilter: "blur(12.901785850524902px)",
                        borderRadius: "8px",
                        border: "2px solid var(--colorBlack)",
                        color: "var(--colorBlack)",
                        fontSize: "15px",
                        padding: "8px",
                    },
                },
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                },
            }}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    <Box display="flex" alignItems="center" gap={2}>
                        {option?.iconLeft && option.iconLeft}
                        {option.label}
                        {option?.iconRight && option.iconRight}
                    </Box>
                </MenuItem>
            ))}
        </MuiSelect>
    );
};
