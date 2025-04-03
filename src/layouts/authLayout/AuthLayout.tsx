import { Outlet } from "react-router-dom";
import "./authLayout.scss";
import { Header } from "./components/header/Header";

const AuthLayout = () => {
    return (
        <div className="authLayout">
            <Header />
            <div className="authLayoutChildren">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;