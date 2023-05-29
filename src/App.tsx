import { useState } from "react";
import CustomCalendar from "./Components/CustomCalendar/CustomCalendar";
import { ChakraProvider } from "@chakra-ui/react";
import DragAndDrop from "./Components/DragAndDrop/DragAndDrop";
import CalendarSteps from "./Components/CalendarSteps/CalendarSteps";
import { Calendar } from "./Components/Calendar";

function App() {
  return (
    <ChakraProvider>
      <div style={{ height: "95vh" }}>
        {/* <Calendar /> */}
        {/* <CustomCalendar /> */}
        {/* <CalendarSteps /> */}
        <DragAndDrop />
      </div>
    </ChakraProvider>
  );
}

export default App;
