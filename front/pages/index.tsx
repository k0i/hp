import { Container, Text, Heading, Box, Link } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NavBar } from "../components/common/navbar";
import { getLastArticle } from "../utils/fs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";

type TopPageProps = {
  title: string;
  content: string;
  date: string;
};
const Home = ({ title, content, date }: TopPageProps) => {
  return (
    <>
      <Head>
        <title>Hut K</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <Container maxW={"100%"} py={5} centerContent={true}>
          <Heading size="xl" py={2} as="h1">
            {title}
          </Heading>
          <Text as="em">{date}</Text>
        </Container>
        <Container
          maxW={"85%"}
          borderWidth="1px"
          borderRadius="lg"
          px={10}
          bgColor="white"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <Heading {...props} as="h2" size="xl" p={8} />
              ),
              h2: ({ node, ...props }) => (
                <Heading {...props} as="h2" size="lg" p={8} />
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
                <Box bg="gray.100" w="100%" p={4}>
                  <Text as="cite">{props.children}</Text>
                </Box>
              ),
              a: ({ node, ...props }) => (
                <Link href={props.href} isExternal p={2} color="purple.700">
                  {props.children} <ExternalLinkIcon mx="2px" />
                </Link>
              ),

              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    // eslint-disable-next-line react/no-children-prop
                    children={String(children).replace(/\n$/, "")}
                    style={atomDark}
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
            {content}
          </ReactMarkdown>
        </Container>
      </NavBar>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const post = await getLastArticle("content");
  return {
    props: {
      title: post.title,
      content: post.content,
      date: post.created_at.substring(0, 10),
    },
  };
};
