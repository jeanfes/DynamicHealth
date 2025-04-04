import { EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import useAppointmentStore from "@/store/appointmentStore";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es-us";
import { AlertModal } from "../alertModal/AlertModal";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import "./bigCalendar.scss";

interface CalendarEvent {
    id: number;
    extendedProps?: {
        date?: string;
        time?: string;
        status?: string;
        location?: string;
        specialty?: string;
        doctor?: string;
    };
}

interface BigCalendarProps {
    values: CalendarEvent[];
}

export const BigCalendar = ({ values }: BigCalendarProps) => {
    const [open, setOpen] = useState(false);
    const { updateAppointment } = useAppointmentStore();
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    const handleEvents = (eventClick: EventClickArg) => {
        const currentEvent = values.find((element) => element.id === Number(eventClick.event.id));
        if (currentEvent) {
            eventClick.jsEvent.preventDefault();
            setSelectedEvent(currentEvent);
            setOpen(true);
        }
    };

    const eventClassNames = (eventInfo: EventContentArg) => {
        const status = (eventInfo.event.extendedProps as { status?: string }).status;
        if (
            status === "Confirmada" ||
            status === "Finalizada" ||
            status === "Aceptada"
        ) {
            return ["event-confirmed"];
        } else if (
            status === "Cancelada" ||
            status === "Rechazada"
        ) {
            return ["event-cancelled"];
        }
        return [];
    };

    const renderEventContent = (eventInfo: { event: { extendedProps: { specialty: string; doctor: string } } }) => {
        const { specialty, doctor } = eventInfo.event.extendedProps;
        return (
            <div className="eventContentCalendar">
                <div>{specialty}</div>
                <div>{doctor}</div>
            </div>
        );
    };

    const handleCancelAppointment = () => {
        if (selectedEvent?.id !== undefined) {
            updateAppointment(selectedEvent.id, { status: "Cancelada" });
        }
        setOpen(false);
    };

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "title",
                    center: "dayGridMonth,timeGridWeek,timeGridDay",
                    right: "prev,next today",
                }}
                views={{
                    dayGridMonth: {
                        titleFormat: { month: "short", year: "numeric" },
                    },
                    timeGridWeek: {
                        titleFormat: { day: "numeric", month: "short", year: "numeric" },
                    },
                    timeGridDay: {
                        titleFormat: { day: "numeric", month: "short", year: "numeric" },
                    },
                }}
                titleFormat={{ month: "short", year: "numeric" }}
                dayHeaderFormat={{ weekday: "long" }}
                dayMaxEvents={1}
                eventMaxStack={1}
                events={values.map(event => ({ ...event, id: event.id.toString() }))}
                eventClick={handleEvents}
                eventTimeFormat={{ hour: "numeric", hour12: true }}
                eventContent={renderEventContent}
                eventClassNames={eventClassNames}
                locale={esLocale}
                slotMinTime="06:00:00"
                slotMaxTime="19:00:00"
                slotLabelFormat={{ hour: "numeric", hour12: true }}
                allDaySlot={false}
                height="auto"
            />
            <AlertModal
                open={open}
                handleClose={() => setOpen(false)}
                type={selectedEvent?.extendedProps?.status === "Cancelada" ? "modal" : "confirmation"}
                designButtonConfirmation="buttonRed"
                textButton="Cancelar cita"
                onClick={handleCancelAppointment}
                showCloseIcon={true}
            >
                {selectedEvent && (
                    <div className="cardDisponibilityModal">
                        <h2 className="cardDisponibilityModalTitle">Detalles de la cita</h2>
                        <div className="cardDisponibilityModalDetails">
                            <span className="cardDisponibilityModalLabel">Fecha:</span>
                            <span className="cardDisponibilityModalValue">{selectedEvent.extendedProps?.date}</span>
                        </div>
                        <div className="cardDisponibilityModalDetails">
                            <span className="cardDisponibilityModalLabel">Hora:</span>
                            <span className="cardDisponibilityModalValue">{selectedEvent.extendedProps?.time}</span>
                        </div>
                        <div className="cardDisponibilityModalDetails">
                            <span className="cardDisponibilityModalLabel">Doctor:</span>
                            <span className="cardDisponibilityModalValue">{selectedEvent.extendedProps?.doctor}</span>
                        </div>
                        <div className="cardDisponibilityModalDetails">
                            <span className="cardDisponibilityModalLabel">Ubicación:</span>
                            <span className="cardDisponibilityModalValue">{selectedEvent.extendedProps?.location}</span>
                        </div>
                    </div>
                )}
            </AlertModal>
        </>
    );
};
