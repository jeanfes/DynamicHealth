import { useNavigate } from "react-router-dom";
import "./notFound.scss";
import { Button } from "@/components/button/Button";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="notFoundContainer">
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <Button text="Regresar al inicio" onClick={() => navigate("/")} />
        </div>
    );
}

export default NotFound;