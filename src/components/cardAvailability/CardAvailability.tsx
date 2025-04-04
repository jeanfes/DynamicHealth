import useAvailabilityStore from "@/store/availabilityStore";
import useAppointmentStore from "@/store/appointmentStore";
import { Availability } from "@/interfaces/availability";
import { AlertModal } from "../alertModal/AlertModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import "./cardAvailability.scss";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export const CardAvailability = ({ id, date, doctor, location, time, specialty }: Availability) => {
    const { addAppointment } = useAppointmentStore();
    const formattedDate = date ? new Date(date + "T00:00:00") : null;
    const [open, setOpen] = useState(false);
    const { updateAvailability } = useAvailabilityStore();
    const navigate = useNavigate();

    const handleReserveAvailability = () => {
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
        updateAvailability(id.toString(), { ...appointment, status: "Reservada" });
        setOpen(false);
        toast(
            "Cita reservada con éxito",
            {
                style: {
                    fontFamily: "Mansfield-SemiBold",
                    fontSize: "16px",
                    borderRadius: "0px",
                    border: "2px solid var(--colorBlack)",
                    boxShadow: "4px 4px 0px var(--colorBlack)",
                    background: "var(--colorCyan)",
                    color: "var(--colorBlack)",
                },
            }
        );
        navigate("/home");
    }

    return (
        <>
            <button
                className="cardAvailability"
                onClick={() => setOpen(true)}
            >
                <div className="cardAvailabilityDateContainer">
                    {formattedDate ? (
                        <>
                            <span className="cardAvailabilityDay">{formattedDate.getDate()}</span>
                            <span className="cardAvailabilityMonth">{months[formattedDate.getMonth()]}</span>
                            <span className="cardAvailabilityYear">{formattedDate.getFullYear()}</span>
                        </>
                    ) : (
                        <span>Fecha no disponible</span>
                    )}
                </div>
                <div className="cardAvailabilityDetails">
                    <span className="cardAvailabilityDoctor">Dr. {doctor}</span>
                    <span className="cardAvailabilityLocation">{location}</span>
                    <span className="cardAvailabilityTime">{time}</span>
                    <span className="cardAvailabilitySpecialty">{specialty}</span>
                </div>
            </button>
            <AlertModal
                open={open}
                handleClose={() => setOpen(false)}
                type="confirmation"
                textButton="Reservar cita"
                onClick={handleReserveAvailability}
                showCloseIcon={true}
            >
                <div className="cardAvailabilityModal">
                    <h2 className="cardAvailabilityModalTitle">Detalles de la cita</h2>
                    <div className="cardAvailabilityModalDetails">
                        <span className="cardAvailabilityModalLabel">Fecha:</span>
                        <span className="cardAvailabilityModalValue">{date}</span>
                    </div>
                    <div className="cardAvailabilityModalDetails">
                        <span className="cardAvailabilityModalLabel">Hora:</span>
                        <span className="cardAvailabilityModalValue">{time}</span>
                    </div>
                    <div className="cardAvailabilityModalDetails">
                        <span className="cardAvailabilityModalLabel">Doctor:</span>
                        <span className="cardAvailabilityModalValue">{doctor}</span>
                    </div>
                    <div className="cardAvailabilityModalDetails">
                        <span className="cardAvailabilityModalLabel">Ubicación:</span>
                        <span className="cardAvailabilityModalValue">{location}</span>
                    </div>
                </div>
            </AlertModal>
        </>
    );
};
