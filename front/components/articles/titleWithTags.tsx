import { Text, Heading, VStack, Badge, Code } from "@chakra-ui/react";
import React from "react";
import { TagLiner } from "./tagLiner";

interface Props {
  title: string;
  tags: { size: string; key: string; name: string; color: string }[];
  date: string;
}
export const TitleWithTags = ({ title, tags, date }: Props) => {
  return (
    <VStack textAlign="center">
      <Heading size="lg" py={2} as="h1" id="#title">
        {title}
      </Heading>
      {tags.length !== 0 ? <TagLiner tags={tags} /> : <></>}
      <Badge colorScheme="purple" variant="outline" px={4}>
        <Text as="em">{date}</Text>
      </Badge>
    </VStack>
  );
};
