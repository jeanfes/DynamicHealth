import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuth = useAuthStore((state) => state.isAuth);

    if (isAuth) {
        return children;
    } else {
        return <Navigate to="/landing" />;
    }
};

export default PrivateRoute;
