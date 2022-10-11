import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  value: string;
  language?: string;
};

export const CodeBlock = ({ language, value }: Props) => {
  return (
    <SyntaxHighlighter language={language} style={darcula}>
      {value}
    </SyntaxHighlighter>
  );
};
