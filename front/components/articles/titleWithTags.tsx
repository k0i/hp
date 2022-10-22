import { Text, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { TagLiner } from "./tagLiner";

interface Props {
  title: string;
  tags: { size: string; key: string; name: string; color: string }[];
  date: string;
}
export const TitleWithTags = ({ title, tags, date }: Props) => {
  return (
    <VStack textAlign="center" bgColor="black" pb={4}>
      <Heading size="lg" py={4} as="h1" id="#title">
        {title}
      </Heading>
      {tags.length !== 0 ? <TagLiner tags={tags} /> : <></>}
      <Text as="em">{date}</Text>
    </VStack>
  );
};
