import {
  Box,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import { generateAtcoderGradientColor } from "../../../utils/atcoderRateColor";

interface Props {
  oldRating: number;
  newRating: number;
}
export const AtcoderRateIndicatior = ({ oldRating, newRating }: Props) => {
  const rateDelta = newRating - oldRating;
  const latestRateColor = generateAtcoderGradientColor(newRating);
  return (
    <Stat
      border="1px"
      borderColor="gray.200"
      p={2}
      borderRadius="lg"
      bgGradient={`linear(to-t, ${latestRateColor.color} ,white ${latestRateColor.ratio}%)`}
    >
      <StatLabel>Atcoder Rate</StatLabel>
      <StatNumber>{newRating}</StatNumber>
      <StatHelpText>
        <Box>
          {rateDelta !== 0 ? (
            <StatArrow type={rateDelta > 0 ? "increase" : "decrease"} />
          ) : (
            <></>
          )}
          {oldRating} → {newRating}
        </Box>
      </StatHelpText>
    </Stat>
  );
};
