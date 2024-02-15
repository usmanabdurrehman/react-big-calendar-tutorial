import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  return (
    <BigCalendar
      {...props}
      localizer={localizer}
      views={[Views.DAY, Views.WEEK, Views.MONTH]}
    />
  );
}
