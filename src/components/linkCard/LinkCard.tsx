import { useNavigate } from "react-router-dom";
import "./linkCard.scss"

interface LinkCardProps {
    title?: string;
    textButton?: string;
    icon: React.ReactNode;
    url?: string;
}

export const LinkCard = ({ title, url, textButton, icon }: LinkCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="linkCard">
            <span className="linkCardTitle">
                {title ? title : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </span>
            <div className="linkCardIcon">
                {icon}
            </div>
            <button className="linkCardButton" onClick={() => navigate(url ? url : "/")}>
                {textButton ? textButton : "Visitar"}
            </button>
        </div>
    )
}