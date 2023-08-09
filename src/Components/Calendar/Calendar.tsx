import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  View,
} from "react-big-calendar";
import moment from "moment";
import YearView from "../YearView/YearView";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const events = [
  {
    start: moment("2023-10-10T10:00:00").toDate(),
    end: moment("2023-10-10T12:00:00").toDate(),
    title: "MRI Registration",
  },
  {
    start: moment("2023-01-10T10:00:00").toDate(),
    end: moment("2023-01-10T11:00:00").toDate(),
    title: "ENT Appointment",
  },
  {
    start: moment("2023-06-10T10:00:00").toDate(),
    end: moment("2023-06-10T11:00:00").toDate(),
    title: "Plastic Surgery",
  },
];

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.DAY);
  return (
    <BigCalendar
      views={
        {
          month: true,
          day: true,
          week: true,
          year: YearView,
        } as any
      }
      date={date}
      onNavigate={(date) => setDate(date)}
      localizer={localizer}
      defaultView={Views.WEEK}
      messages={{ year: "Year" } as any}
      view={view}
      onView={(newView) => setView(newView)}
      events={events}
    />
  );
}
