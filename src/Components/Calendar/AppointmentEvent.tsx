import { Box, Flex, Text } from "@chakra-ui/react";
import {
  AppointmentStatusCode,
  EVENT_STATUS_COLORS,
} from "./Calendar.constants";
import { Appointment } from "../../types";

import { useState } from "react";

interface AppointmentEventProps {
  appointment: Appointment;
  onDoubleClick: (appointment: Appointment) => void;
}

export default function AppointmentEvent({
  appointment,
  onDoubleClick,
}: AppointmentEventProps) {
  const { location, status, resource, address } = appointment;
  const background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];

  return (
    <Box
      bg={background}
      p={1}
      height="100%"
      color="black"
      onDoubleClick={() => onDoubleClick(appointment)}
    >
      <Flex alignItems={"center"} justifyContent="space-between">
        <Flex>
          <Text fontSize="xs">{location}</Text>
        </Flex>
        <Flex>
          <Text fontSize="xs">{resource}</Text>
        </Flex>
      </Flex>
      <Box mt={4}>
        {address?.split("\n").map((add: string) => (
          <Text fontSize="xs">{add}</Text>
        ))}
      </Box>
    </Box>
  );
}
