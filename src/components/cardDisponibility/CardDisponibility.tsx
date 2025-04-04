import useAppointmentStore from "@/store/appointmentStore";
import { Disponibility } from "@/interfaces/disponibility";
import { AlertModal } from "../alertModal/AlertModal";
import { useState } from "react";
import "./cardDisponibility.scss";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export const CardDisponibility = ({ id, date, doctor, location, time, specialty }: Disponibility) => {
    const { addAppointment } = useAppointmentStore();
    const formattedDate = date ? new Date(date + "T00:00:00") : null;
    const [open, setOpen] = useState(false);

    const handleReserveDisponibility = () => {
        const appointment = {
            id,
            date,
            time,
            doctor,
            location,
            specialty,
            status: "Confirmada",
        };
        addAppointment(appointment);
        setOpen(false);
    }

    return (
        <>
            <button
                className="cardDisponibility"
                onClick={() => setOpen(true)}
            >
                <div className="cardDisponibilityDateContainer">
                    {formattedDate ? (
                        <>
                            <span className="cardDisponibilityDay">{formattedDate.getDate()}</span>
                            <span className="cardDisponibilityMonth">{months[formattedDate.getMonth()]}</span>
                            <span className="cardDisponibilityYear">{formattedDate.getFullYear()}</span>
                        </>
                    ) : (
                        <span>Fecha no disponible</span>
                    )}
                </div>
                <div className="cardDisponibilityDetails">
                    <span className="cardDisponibilityDoctor">Dr. {doctor}</span>
                    <span className="cardDisponibilityLocation">{location}</span>
                    <span className="cardDisponibilityTime">{time}</span>
                    <span className="cardDisponibilitySpecialty">{specialty}</span>
                </div>
            </button>
            <AlertModal
                open={open}
                handleClose={() => setOpen(false)}
                type="confirmation"
                textButton="Reservar cita"
                onClick={handleReserveDisponibility}
                showCloseIcon={true}
            >
                <div className="cardDisponibilityModal">
                    <h2 className="cardDisponibilityModalTitle">Detalles de la cita</h2>
                    <div className="cardDisponibilityModalDetails">
                        <span className="cardDisponibilityModalLabel">Fecha:</span>
                        <span className="cardDisponibilityModalValue">{date}</span>
                    </div>
                    <div className="cardDisponibilityModalDetails">
                        <span className="cardDisponibilityModalLabel">Hora:</span>
                        <span className="cardDisponibilityModalValue">{time}</span>
                    </div>
                    <div className="cardDisponibilityModalDetails">
                        <span className="cardDisponibilityModalLabel">Doctor:</span>
                        <span className="cardDisponibilityModalValue">{doctor}</span>
                    </div>
                    <div className="cardDisponibilityModalDetails">
                        <span className="cardDisponibilityModalLabel">Ubicación:</span>
                        <span className="cardDisponibilityModalValue">{location}</span>
                    </div>
                </div>
            </AlertModal>
        </>
    );
};
