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
    placeholder?: string;
}

export const Select = ({
    options,
    value,
    onChange,
    background = "var(--colorCyan)",
    iconColor = "var(--colorBlack)",
    className,
    placeholder = "Seleccionar...",
}: CustomSelectProps) => {
    return (
        <MuiSelect
            className={className}
            sx={{
                width: "100%",
                height: "50px",
                background: background,
                backgroundBlendMode: "overlay, normal",
                boxShadow: "4px 4px 0px var(--colorBlack)",
                borderRadius: "0px",
                border: "2px solid var(--colorBlack)",
                textTransform: "capitalize",
                fontFamily: "Mansfield-Bold",
                color: "var(--colorBlack)",
                fontSize: "15px",
                ">fieldset": {
                    display: "none",
                },
            }}
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
                    <path
                        d="M1 1.66357L7 7.66357L13 1.66357"
                        stroke="var(--colorBlack)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
                if (!selected) {
                    return (
                        <span
                            style={{
                                color: "var(--colorBlack)",
                                fontFamily: "Mansfield-Bold",
                            }}
                        >
                            {placeholder}
                        </span>
                    );
                }
                const selectedOption = options.find((option) => option.value === selected);
                return selectedOption ? selectedOption.label : selected;
            }}
            MenuProps={{
                PaperProps: {
                    sx: {
                        marginTop: "8px",
                        background: "var(--colorCyan)",
                        borderRadius: "0px",
                        maxHeight: "300px",
                        border: "2px solid var(--colorBlack)",
                        boxShadow: "4px 4px 0px var(--colorBlack)",
                        "& .MuiMenuItem-root": {
                            color: "var(--colorBlack)",
                            fontFamily: "Mansfield-Bold",
                        },
                    },
                },
            }}
        >
            {
                options.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option.value}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 15px",
                            "&:hover": {
                                backgroundColor: "var(--colorCyan)",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            {option.iconLeft && (
                                <Box
                                    sx={{
                                        color: iconColor,
                                    }}
                                >
                                    {option.iconLeft}
                                </Box>
                            )}
                            <span>{option.label}</span>
                        </Box>
                        {option.iconRight && (
                            <Box
                                sx={{
                                    color: iconColor,
                                }}
                            >
                                {option.iconRight}
                            </Box>
                        )}
                    </MenuItem>
                ))
            }
        </MuiSelect >
    );
};