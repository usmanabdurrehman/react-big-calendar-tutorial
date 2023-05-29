import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Blockout } from "./CustomCalendar.types";

export default function BlockoutEvent({ blockout }: { blockout: Blockout }) {
  return (
    <Flex
      bg="lightgray"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Text color={"gray"} fontWeight="bold" fontSize={"s"} textAlign="center">
        {blockout.name}
      </Text>
    </Flex>
  );
}
