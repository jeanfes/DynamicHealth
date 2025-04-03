import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { memo } from "react";
import "./smallCalendar.scss";

const holidays = [
  "2024-01-01",
  "2024-01-08",
  "2024-03-25",
  "2024-03-28",
  "2024-03-29",
  "2024-05-01",
  "2024-05-13",
  "2024-06-03",
  "2024-06-10",
  "2024-07-01",
  "2024-07-20",
  "2024-08-07",
  "2024-08-19",
  "2024-10-14",
  "2024-11-04",
  "2024-11-11",
  "2024-12-08",
  "2024-12-25",
];

const events = [
  { title: "Vencimiento de actividades", date: "2024-11-22" },
  { title: "Entrega de informe", date: "2024-11-20" },
  { title: "Entrega de informe", date: "2025-01-20" },
];

interface SmallCalendarProps {
  selectedDate?: string;
  setSelectedDate?: (date: string) => void;
  showAllEvents?: boolean;
}

export const SmallCalendar = memo(({ selectedDate, setSelectedDate }: SmallCalendarProps) => {
    const dayHeaderContent = (args: { date: Date }) => {
      const dayNames = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];
      return dayNames[args.date.getUTCDay()];
    };

    return (
      <div className="smallCalendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={esLocale}
          events={events}
          headerToolbar={{ left: "prev", center: "title", right: "next" }}
          titleFormat={{ year: "numeric", month: "long" }}
          dayHeaderFormat={{ weekday: "short" }}
          height="auto"
          fixedWeekCount={false}
          dayHeaderContent={dayHeaderContent}
          dateClick={(info: { dateStr: string; }) => setSelectedDate && setSelectedDate(info.dateStr)}
          dayCellClassNames={({ date }: { date: Date }) => {
            const dateStr = date.toISOString().split("T")[0];
            let classes = "";
            if (selectedDate && selectedDate === dateStr)
              classes += " selected-day";
            if (events.some((event) => event.date === dateStr))
              classes += " has-event";
            if (holidays.includes(dateStr)) classes += " holiday-day";
            return classes.trim();
          }}
          eventContent={() => <></>}
        />
      </div>
    );
  }
);
