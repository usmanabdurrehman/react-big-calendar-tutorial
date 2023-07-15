import { EVENTS } from "../../constants";

import { Calendar as BigCalendar, Components } from "react-big-calendar";
import { props } from "./props";
import "./index.css";
import { AppointmentEvent } from "../AppointmentEvent";
import { EventItem } from "../../types";
import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import moment from "moment";

export default function ContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [xPosition, setXPosition] = useState<string>();
  const [yPosition, setYPosition] = useState<string>();
  const [resourceId, setResourceId] = useState<number>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const components: any = {
    event: ({ event }: { event: EventItem }) => {
      const data = event?.data;
      if (data?.appointment)
        return <AppointmentEvent appointment={data?.appointment} />;
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
      return React.cloneElement(children, {
        onContextMenu: (e: MouseEvent) => {
          e.preventDefault();
          setXPosition(`${e.clientX}px`);
          setYPosition(`${e.clientY}px`);
          setIsOpen(true);
          setSelectedTime(value);
          setResourceId(resource);
        },
      });
    },
  };

  const resources = [
    { id: 1, title: "Dr Alex" },
    { id: 2, title: "Dr John" },
  ];

  return (
    <>
      <div style={{ zIndex: 10, position: "relative" }}>
        <Menu isLazy isOpen={isOpen} onClose={() => {}}>
          {xPosition && yPosition && (
            <MenuButton
              style={{
                position: "fixed",
                zIndex: 1000,
                top: yPosition,
                left: xPosition,
              }}
            ></MenuButton>
          )}
          <MenuList>
            <MenuItem
              onClick={() =>
                alert(
                  `You have selected ${moment(
                    selectedTime
                  )?.format()} for resource ${
                    resources.find((resource) => resource.id === resourceId)
                      ?.title
                  }`
                )
              }
            >
              New Appointment
            </MenuItem>
            <MenuItem>New Blockout</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <BigCalendar
        {...props}
        events={EVENTS}
        components={components}
        resources={resources}
      />
    </>
  );
}
