import { Box, Flex, Text } from "@chakra-ui/react";
import {
  AppointmentStatusCode,
  EVENT_STATUS_COLORS,
} from "./Calendar.constants";
import { Appointment } from "../../types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
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

  const [isOpen, setIsOpen] = useState(false);

  console.log("it rendered");

  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Box
            bg={background}
            p={1}
            height="100%"
            color="black"
            onDoubleClick={() => onDoubleClick(appointment)}
            onContextMenu={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsOpen(true);
            }}
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
              {address.split("\n").map((add: string) => (
                <Text fontSize="xs">{add}</Text>
              ))}
            </Box>
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Options</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>lol</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
