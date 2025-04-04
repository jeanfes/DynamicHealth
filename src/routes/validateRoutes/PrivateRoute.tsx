import { listAppointments } from "@/utilities/storage";
import { useAuthStore } from "../../store/authStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAppointmentStore from "@/store/appointmentStore";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const { addAppointments } = useAppointmentStore();

    useEffect(() => {
        addAppointments(listAppointments);
    }, [addAppointments]);

    if (isAuth) {
        return children;
    } else {
        return <Navigate to="/landing" />;
    }
};

export default PrivateRoute;
