import { ChakraProvider } from "@chakra-ui/react";
import Calendar from "./Components/Calendar/Calendar";

function App() {
  return (
    <ChakraProvider>
      <div style={{ height: "95vh" }}>
        <Calendar />
      </div>
    </ChakraProvider>
  );
}

export default App;
