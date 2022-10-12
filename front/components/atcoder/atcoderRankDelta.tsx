import { Box, StatArrow, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  rankDelta: number;
}
export const AtcoderRankDelta = ({ rankDelta }: Props) => (
  <>
    {rankDelta !== 0 ? (
      <Box>
        <StatArrow type={rankDelta < 0 ? "decrease" : "increase"} />
        <Text as="em">
          {rankDelta < 0 ? "" : "+"}
          {rankDelta} rank
        </Text>
      </Box>
    ) : (
      <></>
    )}
  </>
);
