import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
        Heading,
        Box,
        Text,
        List,
        ListItem,
        ListIcon,
        Link,
        Code,
        Image,
        Center,
        Divider,
} from "@chakra-ui/react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { BsPatchCheckFill } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import NextLink from "next/link";
import { SimpleSidebar } from "./sideBar";
import remarkMath from "remark-math";
import { Article } from "../../types/article";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

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
                        <Box bgColor="gray.900" px={10} pb={30}>
                                <ReactMarkdown
                                        remarkPlugins={[remarkGfm, remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                        components={{
                                                p: React.Fragment,
                                                h1: ({ node, ...props }) => (
                                                        <Heading
                                                                {...props}
                                                                as="h2"
                                                                size="xl"
                                                                py={5}
                                                                id={props.children.toString()}
                                                                textColor="pink.500"
                                                        />
                                                ),
                                                h2: ({ node, ...props }) => (
                                                        <Heading
                                                                {...props}
                                                                as="h2"
                                                                size="lg"
                                                                py={4}
                                                                px={2}
                                                                textColor="orange.300"
                                                        />
                                                ),
                                                h3: ({ node, ...props }) => (
                                                        <Heading
                                                                {...props}
                                                                as="h3"
                                                                size="md"
                                                                textColor="yellow.300"
                                                                py={4}
                                                                px={2}
                                                        />
                                                ),
                                                h4: ({ node, ...props }) => (
                                                        <Heading
                                                                {...props}
                                                                as="h4"
                                                                size="md"
                                                                textColor="teal.300"
                                                                py={4}
                                                                px={2}
                                                        />
                                                ),
                                                h5: ({ node, ...props }) => (
                                                        <Heading
                                                                {...props}
                                                                as="h5"
                                                                size="xs"
                                                                textColor="red.300"
                                                                py={4}
                                                                px={2}
                                                        />
                                                ),
                                                h6: ({ node, ...props }) => (
                                                        <Heading
                                                                {...props}
                                                                as="h6"
                                                                size="xs"
                                                                textColor="cyan.300"
                                                                py={4}
                                                                px={2}
                                                        />
                                                ),
                                                blockquote: ({ node, ...props }) => (
                                                        <Box bg="gray.700" w="100%" p={4} my={4}>
                                                                {/* 
// @ts-ignore */}
                                                                <Text as="em" {...props} />
                                                        </Box>
                                                ),
                                                a: ({ node, ...props }) => (
                                                        <Link
                                                                href={props.href}
                                                                isExternal
                                                                p={2}
                                                                color="purple.300"
                                                                {...props}
                                                        >
                                                                {props.children} <ExternalLinkIcon mx="2px" />
                                                        </Link>
                                                ),
                                                img: ({ node, ...props }) => (
                                                        <Center my={8}>
                                                                <Image {...props} alt={props.title ?? props.src ?? ""} />
                                                        </Center>
                                                ),
                                                hr: ({ node, ...props }) => (
                                                        <Divider my={12} {...props} borderColor="red.400" />
                                                ),
                                                ul: ({ node, ...props }) => <List my={2} {...props} />,
                                                ol: ({ node, ...props }) => <List my={2} {...props} />,
                                                li: ({ node, ...props }) => (
                                                        <ListItem {...props}>
                                                                <ListIcon as={HiCheck} color="purple.500" />
                                                                {props.children}
                                                        </ListItem>
                                                ),

                                                code({ node, inline, className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || "");
                                                        return !inline && match ? (
                                                                <Box my={4} lineHeight="120%">
                                                                        <SyntaxHighlighter
                                                                                // eslint-disable-next-line react/no-children-prop
                                                                                children={String(children).replace(/\n$/, "")}
                                                                                style={materialOceanic}
                                                                                language={match[1] ?? ""}
                                                                                PreTag="div"
                                                                        />
                                                                </Box>
                                                        ) : (
                                                                <Code {...props} bgColor="gray" variant="solid">
                                                                        {children}
                                                                </Code>
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
