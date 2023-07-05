import { Box, Flex, Text } from "@chakra-ui/react";
import {
  AppointmentStatusCode,
  EVENT_STATUS_COLORS,
} from "./Calendar.constants";
import { Appointment } from "./Calendar.types";

export default function AppointmentEvent({
  appointment,
}: {
  appointment: Appointment;
}) {
  const { location, status, resource, address } = appointment;
  const background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];

  return (
    <Box bg={background} p={1} height="100%" color="black">
      <Flex alignItems={"center"} justifyContent="space-between">
        <Flex>
          <Text fontSize="xs">{location}</Text>
        </Flex>
        <Flex>
          <Text fontSize="xs">{resource}</Text>
        </Flex>
      </Flex>
      <Box mt={4}>
        {address.split("\n").map((add) => (
          <Text fontSize="xs">{add}</Text>
        ))}
      </Box>
    </Box>
  );
}
