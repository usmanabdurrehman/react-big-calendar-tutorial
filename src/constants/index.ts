import moment from "moment";
import { Views } from "react-big-calendar";
import { EventItem } from "../types";

export const VIEW_OPTIONS = [
  { id: Views.DAY, label: "Day" },
  { id: Views.WEEK, label: "Week" },
  { id: Views.MONTH, label: "Month" },
];

export const RESOURCES = [
  { id: 1, title: "Dr Alex" },
  { id: 2, title: "Dr John" },
];

export enum AppointmentStatusCode {
  Pending = "P",
  CheckedIn = "CI",
}

export const EVENT_STATUS_COLORS = {
  P: "#bee2fa",
  CI: "#c7edca",
};

export const EVENTS: EventItem[] = [
  {
    start: moment("2022-10-10T10:00:00").toDate(),
    end: moment("2022-10-10T11:00:00").toDate(),
    data: {
      appointment: {
        id: 1,
        status: "P",
        location: "New York",
        resource: "Dr Alex",
        address: "Building 5\nStreet 44\nNear Express Highway\nNew York",
      },
    },
    resourceId: 1,
  },
  {
    start: moment("2022-10-10T12:00:00").toDate(),
    end: moment("2022-10-10T13:00:00").toDate(),
    data: {
      appointment: {
        id: 2,
        status: "CI",
        location: "Washington",
        resource: "Dr David",
        address: "Block 1\nStreet 32\nLong Island\nNew York",
      },
    },
    resourceId: 2,
  },
  {
    start: moment("2022-10-13T10:00:00").toDate(),
    end: moment("2022-10-13T13:00:00").toDate(),
    data: {
      blockout: {
        id: 1,
        name: "Independence Day",
      },
    },
  },
];
