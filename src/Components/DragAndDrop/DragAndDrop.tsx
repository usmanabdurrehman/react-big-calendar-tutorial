import moment from "moment";
import React, { useCallback, useState } from "react";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import { EVENTS } from "../CustomCalendar/CustomCalendar.constants";

export default function DragAndDrop() {
  const [events, setEvents] = useState(EVENTS);

  const onChangeEventTime = useCallback(
    (start: Date, end: Date, appointmentId: number | undefined) => {
      setEvents((prevEvents) => {
        return [
          ...EVENTS.map((event) =>
            event?.data?.appointment?.id === appointmentId
              ? {
                  ...event,
                  start: moment(start)?.toDate(),
                  end: moment(end)?.toDate(),
                }
              : event
          ),
        ];
      });
    },
    []
  );
  console.log("events", events);

  return (
    <CustomCalendar
      resizable
      onEventDrop={({ start, end, event }) => {
        onChangeEventTime(
          start as Date,
          end as Date,
          (event as EventItem)?.data?.appointment?.id
        );
      }}
      onEventResize={({ start, end, event }) => {
        onChangeEventTime(
          start as Date,
          end as Date,
          (event as EventItem)?.data?.appointment?.id
        );
      }}
      events={events}
    />
  );
}
