import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import moment from "moment";
import { cloneElement, useCallback, useMemo, useState } from "react";
import { EventProps, Views } from "react-big-calendar";
import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from "react-bootstrap-icons";
import { EVENTS, RESOURCES_LIST, VIEW_OPTIONS } from "../../constants";
import { EventItem } from "../../types";
import Calendar from "../Calendar";
import AppointmentEvent from "./AppointmentEvent";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const mapLines = (nthChild: string, width: number) =>
  `.rbc-day-slot .rbc-time-slot:nth-child(${nthChild}):after {width: ${width}% !important;}`;

export enum TimeSlotMinutes {
  Five = 5,
  Ten = 10,
  Fifteen = 15,
  Thirty = 30,
}

const timeSlotLinesMap = {
  [TimeSlotMinutes.Five]: `${mapLines("6n + 4", 25)} ${mapLines(
    "3n + 2",
    12.5
  )} ${mapLines("3n + 3", 12.5)}`,
  [TimeSlotMinutes.Ten]: `${mapLines("3n + 2", 12.5)} ${mapLines(
    "3n + 3",
    12.5
  )}`,
  [TimeSlotMinutes.Fifteen]: mapLines("2n", 25),
  [TimeSlotMinutes.Thirty]: "",
};

type Keys = keyof typeof Views;

const PRIMARY_COLOR = "#17405d";
const SECONDARY_COLOR = "#246899";

export default function CustomizedCalendar() {
  const [date, setDate] = useState<Date>(moment("2022-10-10").toDate());
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
  const [contextMenuInfo, setContextMenuInfo] = useState<{
    xPosition: number;
    yPosition: number;
    selectedTime: string;
    resourceId: number;
  }>();

  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).subtract(1, "d").toDate());
    } else if (view === Views.WEEK) {
      setDate(moment(date).subtract(1, "w").toDate());
    } else {
      setDate(moment(date).subtract(1, "M").toDate());
    }
  }, [view, date]);

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).add(1, "d").toDate());
    } else if (view === Views.WEEK) {
      setDate(moment(date).add(1, "w").toDate());
    } else {
      setDate(moment(date).add(1, "M").toDate());
    }
  }, [view, date]);

  const [zoom, setZoom] = useState([5]);

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date).format("dddd, MMMM DD");
    if (view === Views.WEEK) {
      const from = moment(date)?.startOf("week");
      const to = moment(date)?.endOf("week");
      return `${from.format("MMMM DD")} to ${to.format("MMMM DD")}`;
    }
    if (view === Views.MONTH) {
      return moment(date).format("MMMM YYYY");
    }
  }, [view, date]);

  const components: any = {
    event: ({ event }: EventProps<EventItem>) => {
      const data = event?.data;
      if (data?.appointment)
        return (
          <AppointmentEvent
            appointment={data?.appointment}
            isMonthView={view === Views.MONTH}
          />
        );

      return null;
    },
    timeSlotWrapper: ({
      children,
      value,
      resource,
    }: {
      children: JSX.Element;
      value: string;
      resource: number;
    }) => {
      return cloneElement(children, {
        onContextMenu: (e: MouseEvent) => {
          e.preventDefault();
          setContextMenuInfo({
            xPosition: e.clientX,
            yPosition: e.clientY,
            selectedTime: value,
            resourceId: resource,
          });
        },
      });
    },
  };

  const onTodayClick = useCallback(() => {
    setDate(moment().toDate());
  }, []);

  const STEP = 5;
  const TIME_SLOTS = 60 / STEP;

  return (
    <Flex height="100%" direction={"column"} width="100%" gap={2} p={2}>
      <Flex justifyContent={"space-between"} alignItems="center">
        <Box p={2} width="300px">
          <Flex gap={4} alignItems="center">
            <ZoomOut size={20} />
            <RangeSlider
              value={zoom}
              onChange={(zoom) => {
                setZoom(zoom);
              }}
              min={5}
              max={20}
            >
              <RangeSliderTrack bg="lightgray">
                <RangeSliderFilledTrack bg={PRIMARY_COLOR} />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={4} index={0} bg={SECONDARY_COLOR} />
            </RangeSlider>
            <ZoomIn size={20} />
          </Flex>
        </Box>
        <Box
          css={css`
            input {
              border: 2px solid ${PRIMARY_COLOR};
              border-radius: 24px;
              padding: 6px;
              padding-left: 10px;
            }
            z-index: 4;
            position: relative;
          `}
        >
          <DatePicker
            selected={date}
            onChange={(date: Date) => setDate(date)}
          />
        </Box>
        <Flex gap={4}>
          <Button onClick={onTodayClick}>Today</Button>
          <Flex>
            <IconButton
              aria-label="Previous"
              icon={<ArrowLeft />}
              onClick={onPrevClick}
            />
            <Flex
              pl={4}
              pr={4}
              bg={PRIMARY_COLOR}
              color="white"
              alignItems={"center"}
              justifyContent="center"
              width={260}
            >
              <Text fontSize={"medium"}>{dateText}</Text>
            </Flex>
            <IconButton
              aria-label="Next"
              icon={<ArrowRight />}
              onClick={onNextClick}
            />
          </Flex>
        </Flex>

        <ButtonGroup gap={0} spacing={0} isAttached>
          {VIEW_OPTIONS.map(({ id, label }) => (
            <Button
              onClick={() => setView(id)}
              {...(id === view
                ? {
                    bg: PRIMARY_COLOR,
                    color: "white",
                    _hover: {
                      bg: SECONDARY_COLOR,
                      color: "white",
                    },
                  }
                : {})}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>
      <Box
        flex={1}
        width="100%"
        overflow="auto"
        position={"relative"}
        css={css`
          /* Zoom CSS */
          .rbc-timeslot-group {
            min-height: ${zoom?.[0] * 24}px !important;
          }
          ${timeSlotLinesMap[STEP as TimeSlotMinutes]}
        `}
        onClick={(e) => {
          setContextMenuInfo(undefined);
        }}
      >
        <Box zIndex={10} pos="relative">
          <Menu isLazy isOpen={!!contextMenuInfo} onClose={() => {}}>
            {contextMenuInfo && (
              <MenuButton
                style={{
                  position: "fixed",
                  zIndex: 1000,
                  top: contextMenuInfo.yPosition,
                  left: contextMenuInfo.xPosition,
                }}
              ></MenuButton>
            )}
            <MenuList>
              <MenuItem
                onClick={() =>
                  alert(
                    `You have selected ${moment(
                      contextMenuInfo?.selectedTime
                    )?.format("DD/MM/YYYY hh:mm a")} for resource ${
                      RESOURCES_LIST.find(
                        (resource) =>
                          resource.id === contextMenuInfo?.resourceId
                      )?.title
                    }`
                  )
                }
              >
                New Appointment
              </MenuItem>
              <MenuItem>New Blockout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Calendar
          events={EVENTS}
          defaultDate={"2022-10-10"}
          defaultView={Views.WEEK}
          min={moment("2022-10-10T08:00:00").toDate()}
          max={moment("2022-10-10T18:00:00").toDate()}
          resources={view === Views.DAY ? RESOURCES_LIST : undefined}
          // Custom Props

          // Components
          components={components}
          // Toolbar
          toolbar={false}
          date={date}
          view={view}
          onView={setView}
          onNavigate={setDate}
          step={STEP}
          timeslots={TIME_SLOTS}

          // Misc Custom Props

          // formats
          // rtl
          // views
          // messages
          // timeslots
        />
      </Box>
    </Flex>
  );
}
