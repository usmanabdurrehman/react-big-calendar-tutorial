import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "./index.css";
import AppointmentEvent from "./AppointmentEvent";

const localizer = momentLocalizer(moment);

const initProps = {
  localizer: localizer,
  defaultDate: "2022-10-10",
  defaultView: Views.DAY,
  max: moment("2022-10-10T16:00:00").toDate(),
  min: moment("2022-10-10T08:00:00").toDate(),
};

const DndCalendar = withDragAndDrop(BigCalendar);

export const Calendar = () => {
  const components = {
    event: ({ event }: { event: any }) => {
      const data = event?.data;
      if (data?.appointment)
        return <AppointmentEvent appointment={data?.appointment} />;

      return null;
    },
  };

  return (
    <DndCalendar
      style={{ width: "100%" }}
      components={components}
      {...initProps}
    />
  );
};
