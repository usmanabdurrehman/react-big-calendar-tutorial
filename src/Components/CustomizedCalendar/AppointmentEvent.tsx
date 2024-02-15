import { Box, Flex, Text } from "@chakra-ui/react";
import { AppointmentStatusCode, EVENT_STATUS_COLORS } from "../../constants";
import { Appointment } from "../../types";

export default function AppointmentEvent({
  appointment,
  isMonthView,
}: {
  appointment: Appointment;
  isMonthView: boolean;
}) {
  const { location, status, resource, address } = appointment;
  const background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];

  return (
    <Box
      bg={background}
      p={1}
      height="100%"
      color="black"
      {...(isMonthView ? { overflow: "hidden", h: 8 } : {})}
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
        {address.split("\n").map((add) => (
          <Text fontSize="xs">{add}</Text>
        ))}
      </Box>
    </Box>
  );
}
