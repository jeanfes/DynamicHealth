import { Button } from "@/components/button/Button";
import LogoDynamicHealth from "@/assets/images/logoDynamicHealth.png";
import { useNavigate } from "react-router-dom";
import "./header.scss";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="headerAuthLayout">
      <div className="headerLogo" onClick={() => navigate("/")}>
        <img src={LogoDynamicHealth} alt="IconHealth" />
        <p>Dynamic Health</p>
      </div>
      <Button text="Descarga la aplicación" design="secondaryButton" />
    </div>
  );
};
