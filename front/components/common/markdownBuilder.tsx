import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Heading,
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  Link,
} from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { BsPatchCheckFill } from "react-icons/bs";
import NextLink from "next/link";
import { SimpleSidebar } from "./sideBar";
import { Article } from "../../types/article";

interface Props {
  markdown: string;
  articles: Article[];
}
export const MarkDownBuilder = ({ markdown, articles }: Props) => {
  var CommonMark = require("commonmark");
  var ReactRenderer = require("commonmark-react-renderer");
  var parser = new CommonMark.Parser();
  var renderer = new ReactRenderer();
  var ast = parser.parse(markdown);
  var result = renderer.render(ast);
  const h1 = result.filter((r: any) => r.props?.level === 1);

  return (
    <SimpleSidebar toc={<TOC h1={h1} />} articles={articles}>
      <Box bgColor="gray.900" px="10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <Heading
                {...props}
                as="h2"
                size="xl"
                p={8}
                id={props.children.toString()}
              />
            ),
            h2: ({ node, ...props }) => (
              <Heading {...props} as="h2" size="lg" p={8} textColor="white" />
            ),
            h3: ({ node, ...props }) => (
              <Heading {...props} as="h3" size="md" p={6} />
            ),
            h4: ({ node, ...props }) => (
              <Heading {...props} as="h4" size="md" p={6} />
            ),
            h5: ({ node, ...props }) => (
              <Heading {...props} as="h5" size="xs" p={4} />
            ),
            h6: ({ node, ...props }) => (
              <Heading {...props} as="h6" size="xs" p={4} />
            ),
            blockquote: ({ node, ...props }) => (
              <Box bg="gray.600" w="100%" p={4} mb={8}>
                <Text as="cite">{props.children}</Text>
              </Box>
            ),
            a: ({ node, ...props }) => (
              <Link href={props.href} isExternal p={2} color="purple.300">
                {props.children} <ExternalLinkIcon mx="2px" />
              </Link>
            ),

            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  // eslint-disable-next-line react/no-children-prop
                  children={String(children).replace(/\n$/, "")}
                  style={xonokai}
                  language={match[1] ?? ""}
                  PreTag="div"
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </Box>
    </SimpleSidebar>
  );
};
type p = {
  h1: any[];
};
const TOC = ({ h1 }: p): ReactElement => (
  <Box px={4} bgColor="gray.900" rounded={"xl"}>
    <List>
      {h1.map((h) => (
        <NextLink href={`#${h.props.children}`} passHref key={h.props.children}>
          <Link>
            <ListItem _hover={{ boxShadow: "sm", bgColor: "gray.600" }} py="2">
              <Text as="em">
                <ListIcon as={BsPatchCheckFill} color="teal.300" />
                {h.props.children}
              </Text>
            </ListItem>
          </Link>
        </NextLink>
      ))}
    </List>
  </Box>
);
