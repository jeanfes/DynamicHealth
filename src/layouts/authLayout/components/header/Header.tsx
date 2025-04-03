import { Button } from "@/components/button/Button";
import IconHealth from "@/assets/icons/IconHealth.png";
import { useNavigate } from "react-router-dom";
import "./header.scss";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="headerAuthLayout">
      <div className="headerIcon" onClick={() => navigate("/")}>
        <img src={IconHealth} alt="IconHealth" />
        <p>Dynamic Health</p>
      </div>
      <Button text="Descarga la aplicación" design="secondaryButton" />
    </div>
  );
};
