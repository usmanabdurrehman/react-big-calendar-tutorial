import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
  Views,
  View,
} from "react-big-calendar";
import moment from "moment";
import { CustomView } from "../CustomView";
import YearView from "../YearView/YearView";
import { useState } from "react";

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>(Views.DAY);
  return (
    <BigCalendar
      views={
        {
          month: true,
          day: true,
          week: CustomView,
          year: YearView,
        } as any
      }
      {...props}
      date={date}
      onNavigate={(date) => {
        console.log("onNavigate", date);
        setDate(date);
      }}
      localizer={localizer}
      defaultView={Views.WEEK}
      messages={{ year: "Year" } as any}
      view={view}
      onView={(newView) => setView(newView)}
    />
  );
}
