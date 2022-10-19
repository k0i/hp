import React from "react";
import { ArticleTag } from "./tag";
interface Props {
  tags: { size: string; key: string; label: string; color: string }[];
}

export const TagLiner = ({ tags }: Props) => {
  return (
    <>
      {tags.map((t) => (
        <ArticleTag size={t.size} key={t.key} label={t.label} color={t.color} />
      ))}
    </>
  );
};
