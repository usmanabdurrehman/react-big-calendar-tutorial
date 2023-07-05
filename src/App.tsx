import { useState } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarView from "./Components/CalendarView/CalendarView";

function App() {
  return (
    <ChakraProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ height: "95vh" }}>
          <CalendarView />
        </div>
      </LocalizationProvider>
    </ChakraProvider>
  );
}

export default App;
