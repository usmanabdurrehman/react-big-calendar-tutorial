import { ChakraProvider } from "@chakra-ui/react";
import CalendarView from "./Components/CalendarView/CalendarView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
    },
  },
});

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <div style={{ height: "95vh" }}>
          <CalendarView />
        </div>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
