import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  DateLocalizer,
  Navigate,
  stringOrDate,
  ViewProps,
} from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";

export default function CustomWeekView({
  date,
  localizer,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  ...props
}: ViewProps) {
  const currRange = useMemo(
    () => CustomWeekView.range(date, { localizer }),
    [date, localizer]
  );

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={localizer.add(localizer.endOf(new Date(), "day"), -8, "hour")}
      min={localizer.add(localizer.startOf(new Date(), "day"), 8, "hour")}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  );
}

CustomWeekView.range = (
  date: Date,
  { localizer }: { localizer: DateLocalizer }
) => {
  const start = date;
  const end = localizer.add(start, 2, "day");

  let current = start;
  const range = [];

  while (localizer.lte(current, end, "day")) {
    range.push(current);
    current = localizer.add(current, 1, "day");
  }

  return range;
};

CustomWeekView.navigate = (
  date: Date,
  action: any,
  { localizer }: { localizer: DateLocalizer }
) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, "day");

    case Navigate.NEXT:
      return localizer.add(date, 3, "day");

    default:
      return date;
  }
};

CustomWeekView.title = (
  date: Date,
  { localizer }: { localizer: DateLocalizer }
) => {
  const [start, ...rest] = CustomWeekView.range(date, { localizer });
  return localizer.format({ start, end: rest.pop() }, "dayRangeHeaderFormat");
};
