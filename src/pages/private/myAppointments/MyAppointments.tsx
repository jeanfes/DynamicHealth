import { CardAppointment } from "@/components/cardAppointment/CardAppointment";
import useAppointmentStore from "@/store/appointmentStore";
import "./myAppointments.scss";

const MyAppointments = () => {
    const { appointmentList } = useAppointmentStore();
    const sortedAppointments = [...appointmentList].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="myAppointments">
            <h1>Mis citas</h1>
            <div className="myAppointmentsList">
                {sortedAppointments.map((appointment) => (
                    <CardAppointment key={appointment.id} {...appointment} />
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
