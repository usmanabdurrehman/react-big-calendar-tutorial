import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "./index.css";
import { EVENTS } from "./CustomCalendar/CustomCalendar.constants";

const localizer = momentLocalizer(moment);

export const Calendar = (props: Omit<CalendarProps, "localizer">) => {
  return (
    <BigCalendar
      {...props}
      localizer={localizer}
      defaultDate={"2022-10-10"}
      defaultView={"week"}
      max={moment("2022-10-10T16:00:00").toDate()}
      min={moment("2022-10-10T08:00:00").toDate()}
    />
  );
};
