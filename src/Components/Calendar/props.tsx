import moment from "moment";
import { momentLocalizer, Views } from "react-big-calendar";
import { AppointmentEvent } from "../AppointmentEvent";

const localizer = momentLocalizer(moment);

export const props = {
  localizer,
  defaultDate: "2022-10-10",
  defaultView: Views.DAY,
  max: moment("2022-10-10T16:00:00").toDate(),
  min: moment("2022-10-10T08:00:00").toDate(),
};
