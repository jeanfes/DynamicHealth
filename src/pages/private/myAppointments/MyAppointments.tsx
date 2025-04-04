import { BigCalendar } from "@/components/bigCalendar/BigCalendar";
import useAppointmentStore from "@/store/appointmentStore";
import { convertTo24Hour } from "@/utilities/time";
import "./myAppointments.scss";

const MyAppointments = () => {
    const { appointmentList } = useAppointmentStore();
    const sortedAppointments = [...appointmentList].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const calendarEvents = sortedAppointments.map((appointment) => ({
        id: appointment.id,
        start: `${appointment.date}T${convertTo24Hour(appointment.time)}`,
        extendedProps: {
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
            location: appointment.location,
            specialty: appointment.specialty,
            doctor: appointment.doctor,
        },
    }));

    return (
        <div className="myAppointments">
            <h1>Mis citas</h1>
            <div className="myAppointmentsList">
                <BigCalendar values={calendarEvents} />
            </div>
        </div>
    );
};

export default MyAppointments;