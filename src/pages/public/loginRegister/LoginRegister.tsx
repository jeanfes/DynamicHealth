import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { useAuthStore } from "@/store/authStore";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./loginRegister.scss";

const LoginRegister = () => {
  const location = useLocation();
  const { activeFrom } = location.state || { activeFrom: undefined };
  const [isRegister, setIsRegister] = useState<boolean>(activeFrom ? true : false);
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [loginIdentificationNumber, setLoginIdentificationNumber] = useState<string>("");
  const [loginBirthDate, setLoginBirthDate] = useState<string>("");
  const [registerIdentificationNumber, setRegisterIdentificationNumber] = useState<string>("");
  const [registerBirthDate, setRegisterBirthDate] = useState<string>("");

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const user = {
        id: "123",
        profile: {
          id: 1,
          identification_type: "DNI",
          name: "Juan",
          last_name: "Pérez",
          email: "juan.perez@example.com",
          birth_date: loginBirthDate,
        },
        token: "abcdef123456",
        identification_number: loginIdentificationNumber,
      };
      login(user);
      setLoading(false);
    }, 500);
  };

  const switchToLogin = () => {
    setIsRegister(false);
    setRegisterIdentificationNumber("");
    setRegisterBirthDate("");
  };

  const switchToRegister = () => {
    setIsRegister(true);
    setLoginIdentificationNumber("");
    setLoginBirthDate("");
  };

  return (
    <div
      className={`loginRegister${isRegister ? " active" : ""}`}
      id="loginRegister"
    >
      <div className="formContainer signUp">
        <div className="formLoginRegister">
          <h1>Crear Cuenta</h1>
          <span>con tu número de identificación y tu fecha de nacimiento</span>
          <Input
            value={registerIdentificationNumber}
            onChange={setRegisterIdentificationNumber}
            placeholder="Número de identificación"
          />
          <Input
            value={registerBirthDate}
            onChange={setRegisterBirthDate}
            type="date"
            placeholder="Fecha de nacimiento"
          />
          <Button
            text="Registrarse"
            design="primaryButton"
            maxWidth={false}
            loading={loading}
            onClick={() => {
              /* Aquí puedes agregar la lógica de registro */
            }}
          />
        </div>
      </div>
      <div className="formContainer signIn">
        <div className="formLoginRegister">
          <h1>Iniciar Sesión</h1>
          <span>con tu número de identificación y tu fecha de nacimiento</span>
          <Input
            value={loginIdentificationNumber}
            onChange={setLoginIdentificationNumber}
            placeholder="Número de identificación"
          />
          <Input
            value={loginBirthDate}
            onChange={setLoginBirthDate}
            type="date"
            placeholder="Fecha de nacimiento"
          />
          <Button
            text="Entrar"
            design="primaryButton"
            loading={loading}
            maxWidth={false}
            onClick={handleLogin}
          />
        </div>
      </div>
      <div className="toggleContainer">
        <div className="toggle">
          <div className="togglePanel toggleLeft">
            <h1>¡Bienvenido de nuevo!</h1>
            <p>
              Ingresa tus datos personales para acceder a todas las funciones
            </p>
            <Button
              text="Entrar"
              design="tertiaryButton"
              onClick={switchToLogin}
              maxWidth={false}
            />
          </div>
          <div className="togglePanel toggleRight">
            <h1>¡Hola!</h1>
            <p>
              Regístrate con tus datos personales para acceder a todas las
              funciones
            </p>
            <Button
              text="Registrarse"
              design="tertiaryButton"
              onClick={switchToRegister}
              maxWidth={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
