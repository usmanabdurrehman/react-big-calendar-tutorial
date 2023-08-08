import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  DateLocalizer,
  Navigate,
  stringOrDate,
  ViewProps,
  Views,
} from "react-big-calendar";
import Calendar from "react-calendar";
import { Grid, GridItem } from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";

export default function YearView({
  date,
  localizer,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  onView,
  onNavigate,
  ...props
}: ViewProps) {
  // console.log({ props });
  const currRange = useMemo(
    () => YearView.range(date, { localizer }),
    [date, localizer]
  );

  // console.log({ currRange });

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      {currRange.map((month, index) => (
        <GridItem w="100%" key={index}>
          <Calendar
            activeStartDate={month}
            onClickDay={(day) => {
              console.log({ day });
              onView && onView(Views.DAY);
              onNavigate(day);
            }}
          />
        </GridItem>
      ))}
    </Grid>
  );
}

YearView.range = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  const start = localizer.startOf(date, "year");
  const end = localizer.endOf(start, "year");

  let current = start;
  const range = [];

  while (localizer.lte(current, end, "year")) {
    range.push(current);
    current = localizer.add(current, 1, "month");
  }

  // console.log(
  //   range.map((r) => r.toISOString()),
  //   date.toISOString()
  // );

  return range;
};

YearView.navigate = (
  date: Date,
  action: any,
  { localizer }: { localizer: DateLocalizer }
) => {
  console.log("we here", date, action);
  if (action instanceof Date) return action;

  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, "year");

    case Navigate.NEXT:
      return localizer.add(date, 1, "year");

    default:
      console.log("we here in default");
      return date;
  }
};

YearView.title = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  return localizer.format(date, "YYYY");
};
