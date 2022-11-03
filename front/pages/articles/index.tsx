import { Container, SimpleGrid } from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { NavBar } from "../../components/common/navbar";
import { BlogPostWithImage } from "../../components/articles/articleCard";
import { Article } from "../../types/article";
import { getAllArticles } from "../../utils/fs";
import { TAG_COLOR } from "../../const";
interface Props {
  articles: Article[];
}

const Home = ({ articles }: Props) => {
  return (
    <>
      <Head>
        <title>Hut K - Articles</title>
        <meta name="description" content="articles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <Container maxW={"80%"} py={5} centerContent={true}>
          <Container maxW={"100%"} py={8} centerContent={true}>
            <SimpleGrid minChildWidth="360px" spacing="1px" w="100%">
              {articles.map((a) => (
                <BlogPostWithImage
                  title={a.title}
                  content={a.content}
                  createdAt={a.created_at}
                  id={a.id}
                  key={a.id}
                  tags={a.tags.map((t) => ({
                    name: t.name,
                    key: t.id,
                    size: "md",
                    color: TAG_COLOR[t.name as keyof typeof TAG_COLOR],
                  }))}
                />
              ))}
            </SimpleGrid>
          </Container>
        </Container>
      </NavBar>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const articles = getAllArticles("content");
  return {
    props: { articles },
  };
};
