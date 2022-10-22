import {
  Stack,
  Badge,
  Box,
  Text,
  HStack,
  Heading,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import React from "react";
import { HealthCheckInfo } from "../../types/healthchecks";
import { GiBackwardTime } from "react-icons/gi";

export const HealthCheckIndicator = ({
  checks,
}: {
  checks: HealthCheckInfo["checks"];
}) => {
  const latestSync = checks
    .map((c) => new Date(c.last_ping))
    .reduce((a, b) => (a < b ? a : b));
  console.log(latestSync.getHours());
  console.log(latestSync.toLocaleTimeString());
  return (
    <>
      <Stack direction="row" pb={2}>
        <HStack spacing={2}>
          {checks.map((c) => (
            <Box key={c.name}>
              <Text size="sm" bgColor="gray.700">
                {c.name}
                {c.status === "up" ? (
                  <Badge ml="1" colorScheme="green">
                    {c.status}
                  </Badge>
                ) : c.status === "down" ? (
                  <Badge ml="1" colorScheme="red">
                    {c.status}
                  </Badge>
                ) : (
                  <Badge ml="1" colorScheme="yellow">
                    delay
                  </Badge>
                )}
              </Text>
            </Box>
          ))}
        </HStack>
      </Stack>
      <Tag size="sm" variant="outline" colorScheme="cyan">
        <TagLeftIcon as={GiBackwardTime} />
        <TagLabel>
          {latestSync.getHours().toString().padStart(2, "0")} :{" "}
          {latestSync.getMinutes().toString().padStart(2, "0")}
        </TagLabel>
      </Tag>
    </>
  );
};
