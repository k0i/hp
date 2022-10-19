import { Tag, TagLabel } from "@chakra-ui/react";
import React from "react";

interface Props {
  size: string;
  label: string;
  color: string;
}
export const ArticleTag = ({ size, label, color }: Props) => {
  return (
    <Tag size={size} key={label} variant="outline" colorScheme={color} mr={2}>
      <TagLabel>{label}</TagLabel>
    </Tag>
  );
};
