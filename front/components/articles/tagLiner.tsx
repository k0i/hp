import { Flex } from "@chakra-ui/react";
import React from "react";
import { ArticleTag } from "./tag";
interface Props {
  tags: { size: string; key: string; name: string; color: string }[];
}

export const TagLiner = ({ tags }: Props) => {
  return (
    <Flex my={2}>
      {tags.map((t) => (
        <ArticleTag size={t.size} key={t.key} label={t.name} color={t.color} />
      ))}
    </Flex>
  );
};
