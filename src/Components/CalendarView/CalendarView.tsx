import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import { Appointment } from "../../types";
import EventForm from "../EventForm/EventForm";

export default function CalendarView() {
  const [appointment, setAppointment] = useState<Appointment>();
  return (
    <Flex gap={10} m={4} height="100%">
      <Flex grow={1} flexBasis={"50%"} overflow="auto">
        <Calendar onShowAppointmentView={setAppointment} />
      </Flex>
      <Flex grow={1} flexBasis={"50%"}>
        {appointment && <EventForm appointment={appointment} />}
      </Flex>
    </Flex>
  );
}
