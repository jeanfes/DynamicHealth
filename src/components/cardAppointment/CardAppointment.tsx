import useAppointmentStore from "@/store/appointmentStore";
import { Appointment } from "@/interfaces/appointment";
import { getLocalDateString } from "@/utilities/time";
import { AlertModal } from "../alertModal/AlertModal";
import { useState } from "react";
import "./cardAppointment.scss";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export const CardAppointment = ({ id, date, doctor, location, status, time, specialty }: Appointment) => {
    const today = getLocalDateString(new Date());
    const { updateAppointment } = useAppointmentStore();
    const formattedDate = date ? new Date(date + "T00:00:00") : null;
    const appointmentDate = formattedDate ? getLocalDateString(formattedDate) : null;
    const isPast = appointmentDate ? appointmentDate < today : false;
    const isCanceled = status?.toLowerCase() === "cancelada";
    const [open, setOpen] = useState(false);

    const isDisabled = isPast || isCanceled;

    const getBackgroundColor = (): string => {
        if (isPast) return "var(--colorYellow)";
        if (isCanceled) return "var(--colorRed)";
        return "var(--colorCyan)";
    };

    const handleCancelAppointment = () => {
        updateAppointment(id, { status: "Cancelada" });
        setOpen(false);
    };

    return (
        <>
            <button
                className="cardAppointment"
                onClick={() => setOpen(true)}
                style={{
                    pointerEvents: isDisabled ? "none" : "auto",
                    backgroundColor: getBackgroundColor(),
                }}
            >
                <div className="cardAppointmentDateContainer">
                    {formattedDate ? (
                        <>
                            <span className="cardAppointmentDay">{formattedDate.getDate()}</span>
                            <span className="cardAppointmentMonth">{months[formattedDate.getMonth()]}</span>
                            <span className="cardAppointmentYear">{formattedDate.getFullYear()}</span>
                        </>
                    ) : (
                        <span>Fecha no disponible</span>
                    )}
                </div>
                <div className="cardAppointmentDetails">
                    <span className="cardAppointmentDoctor">Dr. {doctor}</span>
                    <span className="cardAppointmentLocation">{location}</span>
                    <span className="cardAppointmentTime">{time}</span>
                    <span className="cardAppointmentSpecialty">{specialty}</span>
                </div>
            </button>
            <AlertModal
                open={open}
                handleClose={() => setOpen(false)}
                type="confirmation"
                designButtonConfirmation="buttonRed"
                textButton="Cancelar cita"
                onClick={handleCancelAppointment}
                showCloseIcon={true}
            >
                <div className="cardAppointmentModal">
                    <h2 className="cardAppointmentModalTitle">Detalles de la cita</h2>
                    <div className="cardAppointmentModalDetails">
                        <span className="cardAppointmentModalLabel">Fecha:</span>
                        <span className="cardAppointmentModalValue">{date}</span>
                    </div>
                    <div className="cardAppointmentModalDetails">
                        <span className="cardAppointmentModalLabel">Hora:</span>
                        <span className="cardAppointmentModalValue">{time}</span>
                    </div>
                    <div className="cardAppointmentModalDetails">
                        <span className="cardAppointmentModalLabel">Doctor:</span>
                        <span className="cardAppointmentModalValue">{doctor}</span>
                    </div>
                    <div className="cardAppointmentModalDetails">
                        <span className="cardAppointmentModalLabel">Ubicación:</span>
                        <span className="cardAppointmentModalValue">{location}</span>
                    </div>
                </div>
            </AlertModal>
        </>
    );
};
