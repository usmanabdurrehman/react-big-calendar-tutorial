import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import CustomizedCalendar from "./Components/CustomizedCalendar/CustomizedCalendar";
import NormalCalendar from "./Components/NormalCalendar/NormalCalendar";

function App() {
  return (
    <div style={{ height: "99vh" }}>
      <ChakraProvider>
        <CustomizedCalendar />
        {/* <NormalCalendar /> */}
      </ChakraProvider>
    </div>
  );
}

export default App;
