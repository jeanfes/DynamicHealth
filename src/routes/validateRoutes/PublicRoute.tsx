import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const { isAuth } = useAuthStore();

    if (isAuth) {
        return <Navigate to="/home" />;
    } else {
        return children;
    }
};

export default PublicRoute;
