import { Box, BoxProps } from "@chakra-ui/react";

export default function OutsideEvent({ children, ...rest }: BoxProps) {
  return (
    <Box
      p={1}
      bg="#1b4e3f"
      color="white"
      cursor={"pointer"}
      draggable
      className="draggable"
      style={{ border: "1px solid black" }}
      {...rest}
    >
      {children}
    </Box>
  );
}
