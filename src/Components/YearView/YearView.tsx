import { useMemo } from "react";
import { DateLocalizer, Navigate, ViewProps, Views } from "react-big-calendar";
import Calendar from "react-calendar";
import { Grid, GridItem } from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import moment from "moment";

export default function YearView({
  date,
  localizer,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  onView,
  onNavigate,
  events,
}: ViewProps) {
  const currRange = useMemo(
    () => YearView.range(date, { localizer }),
    [date, localizer]
  );

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
            tileClassName={({ date, view }) => {
              if (
                view === "month" &&
                events?.find((event) =>
                  moment(event.start)?.isSame(moment(date), "day")
                )
              )
                return "event-day";
              return null;
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

  return range;
};

YearView.navigate = (
  date: Date,
  action: any,
  { localizer }: { localizer: DateLocalizer }
) => {
  if (action instanceof Date) return action;

  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, "year");

    case Navigate.NEXT:
      return localizer.add(date, 1, "year");

    default:
      return date;
  }
};

YearView.title = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  return localizer.format(date, "YYYY");
};
