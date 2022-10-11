import {
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Box,
  SlideFade,
  ScaleFade,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { AwsBadge } from "../components/common/awsBadge";
import { NavBar } from "../components/common/navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hut K - Posts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <Container maxW={"5xl"}>
          <Stack
            textAlign={"center"}
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
          >
            <ScaleFade initialScale={0.7} in={true}>
              <Heading
                fontWeight={600}
                fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
              >
                Hut{" "}
                <Text as="em" color={"orange.400"}>
                  K
                </Text>
              </Heading>
            </ScaleFade>
            <SlideFade in={true} offsetY="40px">
              <Text as="u" fontSize="md">
                tech中心にその他諸々....
              </Text>
            </SlideFade>
          </Stack>
          <SimpleGrid minChildWidth="240px" spacing="20px">
            <Box bg="tomato" height="180px">
              Blog Post Skelton
            </Box>
            <Box bg="tomato" height="180px">
              Blog Post Skelton
            </Box>
            <Box bg="tomato" height="180px">
              Blog Post Skelton
            </Box>
            <Box bg="tomato" height="180px">
              Blog Post Skelton
            </Box>
            <Box bg="tomato" height="180px">
              Blog Post Skelton
            </Box>
          </SimpleGrid>
        </Container>
      </NavBar>
    </>
  );
};

export default Home;
