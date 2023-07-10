import moment from "moment";
import { EventItem } from "../../types";

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
        start: "2022-10-10T10:00:00",
        end: "2022-10-10T11:00:00",
      },
    },
    isDraggable: true,
  },
  {
    start: moment("2022-10-10T12:00:00").toDate(),
    end: moment("2022-10-10T15:00:00").toDate(),
    data: {
      appointment: {
        id: 2,
        status: "CI",
        location: "Washington",
        resource: "Dr David",
        address: "Block 1\nSStreet 32\nLong Island\nNew York",
        start: "2022-10-10T12:00:00",
        end: "2022-10-10T15:00:00",
      },
    },
    isDraggable: false,
  },
];
