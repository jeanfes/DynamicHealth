import { Modal, Typography } from "@mui/material";
import { IconX } from "@/assets/icons/IconX";
import { Button } from "../button/Button";
import { ReactNode } from "react";
import "./alertModal.scss";

interface AlertModalProps {
    open: boolean;
    handleClose: () => void;
    type?: "success" | "error" | "confirmation";
    textButton?: string;
    onClick?: () => void;
    title?: string;
    children?: ReactNode | ReactNode[];
    showCloseIcon?: boolean;
}

const typeStyles = {
    success: {
        backgroundColor: "var(--colorGreenLight)",
        borderColor: "var(--colorGreen)",
        titleColor: "var(--colorGreen)",
        shadow: "4px 4px var(--colorGreen)",
    },
    error: {
        backgroundColor: "var(--colorRedLight)",
        borderColor: "var(--colorRed)",
        titleColor: "var(--colorRed)",
        shadow: "4px 4px var(--colorRed)",
    },
    confirmation: {
        backgroundColor: "var(--colorWhite)",
        borderColor: "var(--colorBlack)",
        titleColor: "var(--colorBlack)",
        shadow: "4px 4px var(--colorBlack)",
    },
};

export const AlertModal = ({
    open,
    handleClose,
    type = "confirmation",
    title = "",
    children,
    showCloseIcon = true,
    onClick,
    textButton = "",
}: AlertModalProps) => {
    const styles = typeStyles[type];

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose} className="alertModal">
            <div
                className="alertModalContainer"
                style={{
                    border: `2px solid ${styles.borderColor}`,
                    backgroundColor: styles?.backgroundColor || "var(--colorWhite)",
                    boxShadow: styles.shadow,
                }}
            >
                <div className="alertModalHeader">
                    <Typography
                        style={{
                            fontSize: "20px",
                            fontWeight: 700,
                            color: styles.titleColor,
                        }}
                    >
                        {title}
                    </Typography>
                    {showCloseIcon && (
                        <picture onClick={handleClose} style={{ cursor: "pointer" }}>
                            <IconX color="#000" />
                        </picture>
                    )}
                </div>
                <div style={{ color: "var(--colorBlack)", fontSize: "16px" }}>{children}</div>
                {type === "confirmation" && <Button text={textButton} maxWidth design="buttonRed" onClick={handleClick} />}
            </div>
        </Modal>
    );
};
