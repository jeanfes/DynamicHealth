import { listAppointments, listAvailabilities } from "@/utilities/storage";
import useAvailabilityStore from "@/store/availabilityStore";
import useAppointmentStore from "@/store/appointmentStore";
import { useAuthStore } from "../../store/authStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const { addAppointments } = useAppointmentStore();
    const { addAvailabilities } = useAvailabilityStore();

    useEffect(() => {
        addAppointments(listAppointments);
    }, [addAppointments]);

    useEffect(() => {
        addAvailabilities(listAvailabilities);
    }, [addAvailabilities]);

    if (isAuth) {
        return children;
    } else {
        return <Navigate to="/landing" />;
    }
};

export default PrivateRoute;
