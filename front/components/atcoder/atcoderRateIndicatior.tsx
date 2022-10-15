import {
  Box,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import { generateAtcoderRateGradientColor } from "../../utils/atcoderRateColor";

interface Props {
  oldRating: number;
  newRating: number;
}
export const AtcoderRateIndicatior = ({ oldRating, newRating }: Props) => {
  const rateDelta = newRating - oldRating;

  return (
    <Stat
      border="1px"
      borderColor="gray.200"
      p={2}
      borderRadius="lg"
      bgGradient={generateAtcoderRateGradientColor(newRating)}
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
