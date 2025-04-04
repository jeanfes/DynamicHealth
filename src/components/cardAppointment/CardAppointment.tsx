import "./cardAppointment.scss";

interface CardAppointmentProps {
    date?: string;
    time?: string;
    doctor?: string;
    location?: string;
}

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const getBackgroundColor = (appointmentDate: string | null, currentDate: string): string => {
    if (!appointmentDate) return "var(--colorCyan)";
    if (appointmentDate < currentDate) return "var(--colorYellow)";
    if (appointmentDate === currentDate) return "var(--colorRed)";
    return "var(--colorCyan)";
};

export const CardAppointment = ({ date, time, doctor, location }: CardAppointmentProps) => {
    const currentLocalDateString = getLocalDateString(new Date());
    const formattedDate = date ? new Date(date + "T00:00:00") : null;
    const appointmentLocalDateString = formattedDate ? getLocalDateString(formattedDate) : null;
    const bgColor = getBackgroundColor(appointmentLocalDateString, currentLocalDateString);

    return (
        <button
            className="cardAppointment"
            style={{
                pointerEvents:
                    appointmentLocalDateString && appointmentLocalDateString < currentLocalDateString
                        ? "none"
                        : "auto",
                backgroundColor: bgColor,
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
            </div>
        </button>
    );
};
