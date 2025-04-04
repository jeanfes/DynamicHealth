import { loginValidationSchema, signupValidationSchema } from "./schemas/loginRegiser";
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { useAuthStore } from "@/store/authStore";
import { useLocation } from "react-router-dom";
import { User } from "@/interfaces/user";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import "./loginRegister.scss";

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
                const getUsersStorage = localStorage.getItem("listUsers");
                const usersStorage = getUsersStorage ? JSON.parse(getUsersStorage) : [];
                const newUser: User = {
                    id: crypto.randomUUID(),
                    identification_number: values.registerIdentificationNumber || "",
                    profile: {
                        id: usersStorage.length + 1,
                        identification_type: "CC",
                        name: "Usuario",
                        last_name: "Nuevo",
                        email: "",
                        birth_date: values.registerBirthDate || "",
                    },
                    token: crypto.randomUUID(),
                };
                setTimeout(() => {
                    setLoading(false);
                    login(newUser);
                }, 1000);
            } else {
                const getUsersStorage = localStorage.getItem("listUsers");
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
                    toast("Credenciales incorrectas", {
                        style: {
                            fontFamily: "Mansfield-SemiBold",
                            fontSize: "16px",
                            borderRadius: "0px",
                            border: "2px solid var(--colorBlack)",
                            boxShadow: "4px 4px 0px var(--colorBlack)",
                            background: "var(--colorRed)",
                            color: "var(--colorBlack)",
                        },
                    })
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
                                design="buttonCyan"
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
                                design="buttonCyan"
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
                            design="buttonWhite"
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
                            design="buttonWhite"
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
