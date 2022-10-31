import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Article } from "../../types/article";
import { getAllArticles, getFileContent } from "../../utils/fs";
import { NextSeo } from "next-seo";
import { MarkDownBuilder } from "../../components/common/markdownBuilder";
import Head from "next/head";
import { NavBar } from "../../components/common/navbar";
import { Container, Heading, Text } from "@chakra-ui/react";
import { TAG_COLOR } from "../../const";
import { TitleWithTags } from "../../components/articles/titleWithTags";

interface Props {
  article: Article;
  articles: Article[];
}
interface Params extends ParsedUrlQuery {
  id: string;
}

const Home = ({ article, articles }: Props) => {
  const tags = article.tags.map((t) => ({
    name: t.name,
    key: t.id,
    size: "lg",
    color: TAG_COLOR[t.name as keyof typeof TAG_COLOR],
  }));
  return (
    <>
      <NextSeo
        title={article.title}
        description={article.content.slice(0, 20)}
        openGraph={{
          type: "website",
          url: `http:localhost:3000/posts/${article.id}`,
          title: article.title,
          description: article.content.slice(0, 20),
        }}
      />

      <Head>
        <title>{`${article.title} - Hut K`}</title>
        <meta name="description" content={`${article.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <Container maxW="100%" py={5} centerContent={true}>
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

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const article = JSON.parse(
    getFileContent(`${params!.id}.json`, "content")
  ) as Article;
  const articles = getAllArticles("content").filter((a) => a.id !== article.id);
  return {
    props: { article, articles },
  };
};
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const articles = getAllArticles("content");
  const paths = articles.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
