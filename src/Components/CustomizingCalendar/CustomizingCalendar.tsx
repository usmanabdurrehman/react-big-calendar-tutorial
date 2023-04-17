import moment from "moment";
import Calendar from "../Calendar";
import "./index.css";

const events = [
  {
    start: moment("2023-03-18T10:00:00").toDate(),
    end: moment("2023-03-18T11:00:00").toDate(),
    title: "MRI Registration",
  },
  {
    start: moment("2023-03-18T14:00:00").toDate(),
    end: moment("2023-03-18T15:30:00").toDate(),
    title: "ENT Appointment",
  },
];

export default function ControlCalendar() {
  return (
    <Calendar
      events={events}
      formats={{ dayHeaderFormat: (date) => moment(date).format("dddd @ DD") }}
    />
  );
}
