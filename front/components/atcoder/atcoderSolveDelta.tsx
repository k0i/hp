import { Box, Flex, StatArrow, Text } from "@chakra-ui/react";
import React from "react";
import { AtcoderRankDelta } from "./atcoderRankDelta";
interface Props {
  previous: { ac_count: number; ac_rank: number };
  latest: { ac_count: number; ac_rank: number };
}

export const AtcoderSolveDelta = ({ previous, latest }: Props) => {
  const delta = latest.ac_count - previous.ac_count;
  const rankDelta = previous.ac_rank - latest.ac_rank;
  switch (delta == 0) {
    case true:
      return (
        <>
          <Box pr={2}>No progress from yesterday!</Box>
        </>
      );
    default:
      return (
        <Flex>
          <Box pr={2}>
            <StatArrow type="increase" /> <Text as="em">+{delta} problems</Text>
          </Box>
          <AtcoderRankDelta rankDelta={rankDelta} />
        </Flex>
      );
  }
};
