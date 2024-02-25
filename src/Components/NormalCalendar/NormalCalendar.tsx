import { Box } from "@chakra-ui/react";
import moment from "moment";
import { Views } from "react-big-calendar";
import { EVENTS } from "../../constants";
import Calendar from "../Calendar";

export default function NormalCalendar() {
  return (
    <Box
      height="100%"
      css={{
        overflow: "auto",
      }}
    >
      <Calendar
        events={EVENTS}
        defaultDate={"2022-10-10"}
        defaultView={Views.WEEK}
        min={moment("2022-10-10T09:00:00").toDate()}
        max={moment("2022-10-10T18:00:00").toDate()}
      />
    </Box>
  );
}
