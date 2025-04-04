import { loginValidationSchema, signupValidationSchema } from "./schemas/loginRegiser";
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { useAuthStore } from "@/store/authStore";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import "./loginRegister.scss";
import { User } from "@/interfaces/user";

const LoginRegister = () => {
    const location = useLocation();
    const { activeFrom } = location.state || { activeFrom: undefined };
    const [isRegister, setIsRegister] = useState<boolean>(!!activeFrom);
    const { login } = useAuthStore();
    const [loading, setLoading] = useState(false);

    const { values, handleSubmit, setFieldValue, errors, touched, resetForm } = useFormik({
        enableReinitialize: true,
        initialValues: isRegister
            ? { registerIdentificationNumber: "", registerBirthDate: "" }
            : { loginIdentificationNumber: "", loginBirthDate: "" },
        validationSchema: isRegister ? signupValidationSchema : loginValidationSchema,
        onSubmit: (values) => {
            setLoading(true);
            if (isRegister) {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } else {
                const getUsersStorage = localStorage.getItem("usersStorage");
                const usersStorage = getUsersStorage ? JSON.parse(getUsersStorage) : [];
                const userFound = usersStorage.find(
                    (user: User) =>
                        user?.identification_number === values.loginIdentificationNumber &&
                        user?.profile?.birth_date === values.loginBirthDate
                );
                if (userFound) {
                    setTimeout(() => {
                        setLoading(false);
                        login(userFound);
                    }, 1000);
                } else {
                    setLoading(false);
                    alert("Usuario no encontrado");
                }
            }
        },
    });

    const switchToLogin = () => {
        setIsRegister(false);
        resetForm();
    };

    const switchToRegister = () => {
        setIsRegister(true);
        resetForm();
    };

    return (
        <div className={`loginRegister${isRegister ? " active" : ""}`} id="loginRegister">
            <form onSubmit={handleSubmit}>
                {isRegister ? (
                    <div className="formContainer signUp">
                        <div className="formLoginRegister">
                            <h1>Crear Cuenta</h1>
                            <span>Con tu número de identificación y tu fecha de nacimiento</span>
                            <Input
                                value={values.registerIdentificationNumber || ""}
                                onChange={(value) => setFieldValue("registerIdentificationNumber", value)}
                                error={errors.registerIdentificationNumber}
                                touch={touched.registerIdentificationNumber}
                                placeholder="Número de identificación"
                                showErrorMessage
                            />
                            <Input
                                value={values.registerBirthDate || ""}
                                onChange={(value) => setFieldValue("registerBirthDate", value)}
                                placeholder="Fecha de nacimiento (dd/mm/yyyy)"
                                error={errors.registerBirthDate}
                                touch={touched.registerBirthDate}
                                showErrorMessage
                                type="date"
                            />
                            <Button
                                type="submit"
                                text="Registrarse"
                                design="primaryButton"
                                maxWidth={false}
                                loading={loading}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="formContainer signIn">
                        <div className="formLoginRegister">
                            <h1>Iniciar Sesión</h1>
                            <span>Con tu número de identificación y tu fecha de nacimiento</span>
                            <Input
                                value={values.loginIdentificationNumber || ""}
                                onChange={(value) => setFieldValue("loginIdentificationNumber", value)}
                                error={errors.loginIdentificationNumber}
                                touch={touched.loginIdentificationNumber}
                                placeholder="Número de identificación"
                                showErrorMessage
                            />
                            <Input
                                value={values.loginBirthDate || ""}
                                onChange={(value) => setFieldValue("loginBirthDate", value)}
                                placeholder="Fecha de nacimiento (dd/mm/yyyy)"
                                error={errors.loginBirthDate}
                                touch={touched.loginBirthDate}
                                showErrorMessage
                                type="date"
                            />
                            <Button
                                text="Entrar"
                                type="submit"
                                design="primaryButton"
                                loading={loading}
                                maxWidth={false}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                )}
            </form>
            <div className="toggleContainer">
                <div className="toggle">
                    <div className="togglePanel toggleLeft">
                        <h1>¡Bienvenido de nuevo!</h1>
                        <p className="toggleText">
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
                        <p className="toggleText">
                            Regístrate con tus datos personales para acceder a todas las funciones
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
