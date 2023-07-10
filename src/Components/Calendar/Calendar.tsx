import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "./index.css";
import AppointmentEvent from "./AppointmentEvent";
import { Appointment } from "../../types";
import { EVENTS } from "./Calendar.constants";

const localizer = momentLocalizer(moment);

const initProps = {
  localizer: localizer,
  defaultDate: "2022-10-10",
  defaultView: Views.DAY,
  max: moment("2022-10-10T16:00:00").toDate(),
  min: moment("2022-10-10T08:00:00").toDate(),
  step: 15,
  timeslots: 4,
};

const DndCalendar = withDragAndDrop(BigCalendar);
interface CalendarProps {
  onShowAppointmentView: (appointment: Appointment) => void;
}

export const Calendar = ({ onShowAppointmentView }: CalendarProps) => {
  const components = {
    event: ({ event }: { event: any }) => {
      const data = event?.data;
      console.log("we here");
      if (data?.appointment)
        return (
          <AppointmentEvent
            appointment={data?.appointment}
            onDoubleClick={onShowAppointmentView}
          />
        );

      return null;
    },
  };

  return (
    <DndCalendar
      events={EVENTS}
      style={{ width: "100%" }}
      components={components}
      {...initProps}
    />
  );
};
