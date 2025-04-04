import { CardAppointment } from '@/components/cardAppointment/CardAppointment';
import { listAppointments } from '@/utilities/storage';
import './myAppointments.scss';

const MyAppointments = () => {
    return (
        <div className="myAppointments">
            <h1>Mis citas</h1>
            <div className="myAppointmentsList">
                {listAppointments?.map((appointment) => (
                    <CardAppointment key={appointment.id} {...appointment} />
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
