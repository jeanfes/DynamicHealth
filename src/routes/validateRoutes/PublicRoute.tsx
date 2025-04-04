import { useAuthStore } from "../../store/authStore";
import { listUsers } from "@/utilities/storage";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const { isAuth } = useAuthStore();

    useEffect(() => {
        localStorage.setItem("listUsers", JSON.stringify(listUsers));
    }, []);

    if (isAuth) {
        return <Navigate to="/home" />;
    } else {
        return children;
    }
};

export default PublicRoute;
