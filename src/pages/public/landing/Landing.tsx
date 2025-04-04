import HealthLanding from "@/assets/images/healthLanding.png";
import { Button } from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import "./landing.scss";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing">
            <div className="landingLeft">
                <p className="landingText">
                    Cuida tu Salud <br /> de Forma <br /> <span>Inteligente!</span>
                </p>
                <div className="landingButtons">
                    <Button
                        text="Registrarse"
                        design="buttonCyan"
                        onClick={() => navigate("/login-register", { state: { activeFrom: true } })}
                        maxWidth
                    />
                    <Button
                        text="Entrar"
                        design="buttonWhite"
                        onClick={() => navigate("/login-register", { state: { activeFrom: false } })}
                        maxWidth
                    />
                </div>
            </div>
            <picture className="landingImage">
                <img src={HealthLanding} alt="HealthLanding" />
            </picture>
        </div>
    );
};

export default Landing;
