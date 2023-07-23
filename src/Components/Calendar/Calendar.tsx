import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "./index.css";
import AppointmentEvent from "./AppointmentEvent";
import { Appointment, EventItem } from "../../types";
import { EVENTS } from "./Calendar.constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useAppointments } from "../../requests";

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

const DndCalendar = withDragAndDrop<EventItem>(BigCalendar);
interface CalendarProps {
  onShowAppointmentView: (appointment: Appointment) => void;
}

export const Calendar = ({ onShowAppointmentView }: CalendarProps) => {
  const components = {
    event: ({ event }: { event: any }) => {
      const data = event?.data;
      if (data?.appointment)
        return (
          <AppointmentEvent
            appointment={data?.appointment}
            onDoubleClick={() => {}}
          />
        );

      return null;
    },
  };

  const { data } = useAppointments();

  const appointments = data?.map((appointment) => ({
    start: new Date(appointment.start),
    end: new Date(appointment.end),
    data: { appointment },
  }));

  return (
    <DndCalendar
      onSelectSlot={({ start, end }) => {
        onShowAppointmentView({ start, end });
      }}
      onDoubleClickEvent={(event) => {
        const appointment = event?.data?.appointment;
        appointment && onShowAppointmentView(appointment);
      }}
      events={appointments}
      style={{ width: "100%" }}
      components={components}
      selectable
      {...initProps}
    />
  );
};
