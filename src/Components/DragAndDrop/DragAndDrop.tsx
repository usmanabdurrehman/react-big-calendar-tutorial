import moment from "moment";
import { useCallback, useState } from "react";
import { EVENTS } from "../../constants";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Calendar as BigCalendar } from "react-big-calendar";
import { Appointment, EventItem } from "../../types";
import { props } from "./props";
import "./index.css";
import { Box, Flex } from "@chakra-ui/react";
import { OutsideEvent } from "../OutsideEvent";
import { AppointmentEvent } from "../AppointmentEvent";

const DnDCalendar = withDragAndDrop<EventItem>(BigCalendar);
enum Dropppable {
  No = "undroppable",
}

export default function DragAndDrop() {
  const [events, setEvents] = useState(EVENTS);

  const onChangeEventTime = useCallback(
    ({ event, ...rest }: { event: EventItem }) => {
      console.log({
        rest,
        event,
      });
      setEvents((prevEvents) => {
        const s = [
          ...prevEvents.map((prevEvent) =>
            prevEvent?.data?.appointment?.id === event?.data?.appointment?.id
              ? {
                  ...event,
                  ...rest,
                }
              : prevEvent
          ),
        ];
        console.log({ newEvents: s });
        return s;
      });
    },
    []
  );

  console.log({ events });

  const [draggedEvent, setDraggedEvent] = useState<Appointment | Dropppable>();
  const handleDragStart = useCallback(
    (event: Appointment | Dropppable) => setDraggedEvent(event),
    []
  );

  const dummyAppointment = {
    id: 3,
    status: "CI",
    location: "Connecticut",
    resource: "Alex Hales",
    address: "1241 E Main St\n Stamford\n CT 06902\n United States",
  };

  return (
    <Flex p={2} gap={4} height="100%" width="100%" direction={"column"}>
      <Box>
        <Flex gap={4}>
          <Box
            width={200}
            cursor="pointer"
            onDragStart={() => handleDragStart(dummyAppointment)}
            draggable
          >
            <AppointmentEvent appointment={dummyAppointment} />
          </Box>
          <OutsideEvent onDragStart={() => handleDragStart(Dropppable.No)}>
            Draggable but not for calendar.
          </OutsideEvent>
        </Flex>
      </Box>

      <Box flex="1" overflow="auto" width="100%">
        <DnDCalendar
          {...props}
          resizable
          onEventDrop={onChangeEventTime}
          onEventResize={onChangeEventTime}
          draggableAccessor={(event) => !!event?.isDraggable}
          resizableAccessor={(event) => !!event?.isResizable}
          onDropFromOutside={({ start, end, resource }) => {
            if (draggedEvent === Dropppable.No) return;
            setEvents((prevEvents) => [
              ...prevEvents,
              {
                start,
                end,
                data: { appointment: draggedEvent },
                isDraggable: true,
                isResizable: true,
                resourceId: resource,
              },
            ]);
          }}
          events={events}
          resources={[
            { id: 1, title: "Dr Graff" },
            { id: 2, title: "Dr Alex" },
            { id: 3, title: "Dr Michelle" },
          ]}
        />
      </Box>
    </Flex>
  );
}
