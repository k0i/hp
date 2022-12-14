import { Container } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { NavBar } from "../components/common/navbar";
import { getAllArticles, getLastArticle } from "../utils/fs";
import { Article } from "../types/article";
import { MarkDownBuilder } from "../components/common/markdownBuilder";
import { TitleWithTags } from "../components/articles/titleWithTags";
import { TAG_COLOR } from "../const";

const Home = ({
  article,
  articles,
}: {
  article: Article;
  articles: Article[];
}) => {
  const tags = article.tags.map((t) => ({
    name: t.name,
    key: t.id,
    size: "lg",
    color: TAG_COLOR[t.name as keyof typeof TAG_COLOR],
  }));
  return (
    <>
      <Head>
        <title>Hut K</title>
        <meta
          name="description"
          content="セキュリティエンジニアを目指すひよっこエンジニアのブログ"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <Container maxW="100%" pt={5} centerContent={true}>
          <Container maxW={{ base: "100%", md: "90%" }}>
            <TitleWithTags
              title={article.title}
              tags={tags}
              date={article.created_at.slice(0, 10)}
            />
            <MarkDownBuilder markdown={article.content} articles={articles} />
          </Container>
        </Container>
      </NavBar>
    </>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const article = getLastArticle("content");
  const articles = getAllArticles("content").filter((a) => a.id !== article.id);

  return {
    props: {
      article,
      articles,
    },
  };
};
