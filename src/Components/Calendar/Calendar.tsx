import { useState } from "react";
import { EVENTS } from "../../constants";

import { Calendar as BigCalendar } from "react-big-calendar";
import { props } from "./props";
import "./index.css";
import {
  Box,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { css } from "@emotion/css";

export default function DragAndDrop() {
  const [zoom, setZoom] = useState([0]);
  return (
    <Flex p={2} gap={4} height="100%" width="100%" direction={"column"}>
      <Box bg="#0cff52" borderRadius={12} display="flex" alignItems={"center"}>
        <RangeSlider
          value={zoom}
          onChange={(zoom) => setZoom(zoom)}
          min={0}
          max={20}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0} />
        </RangeSlider>
      </Box>
      <Box
        className={css({
          ".rbc-timeslot-group": {
            minHeight: `${zoom?.[0] * 24}px !important`,
          },
        })}
        flex="1"
        overflow="auto"
        width="100%"
      >
        <BigCalendar {...props} events={EVENTS} timeslots={4} step={15} />
      </Box>
    </Flex>
  );
}
