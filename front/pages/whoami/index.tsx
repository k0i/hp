import {
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  keyframes,
  Show,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Center,
  Flex,
} from "@chakra-ui/react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { AwsBadge } from "../../components/common/awsBadge";
import { NavBar } from "../../components/common/navbar";
import { DownloadButton } from "../../components/downloadButton";
import { BarGraph } from "../../components/graph/bar";
import { BarandLineGraph } from "../../components/graph/barAndLine";
import { AtcoderRateIndicatior } from "../../components/whoami/atcoder/atcoderRateIndicatior";
import { AtcoderSolveDelta } from "../../components/whoami/atcoder/atcoderSolveDelta";
import {
  AtcoderAcResult,
  AtcoderContestResult,
  AtcoderInfo,
} from "../../types/atcoder";
import { WakatimeInfo } from "../../types/wakatime";
import { generateAtcoderGradientColor } from "../../utils/atcoderRateColor";
import { diffDates, getPastDate } from "../../utils/date";
import {
  getLatestAtcoderInfo,
  getLatestHealthChecksInfo,
  getLatestWakatimeInfo,
} from "../../utils/fs";
import {
  convertAtcoderAcDataToGraphData,
  convertAtcoderContestDataToGraphData,
  convertWakatimeActivitiesDataToGraphData,
  convertWakatimeLanguagesDataToGraphData,
} from "../../utils/graphData";
import { ATCODER_GRAPH_DATA_COUNT } from "../../const";
import { PolarGraph } from "../../components/graph/polar";
import { ScatterGraph } from "../../components/graph/scatter";
import { HealthCheckInfo } from "../../types/healthchecks";
import { HealthCheckIndicator } from "../../components/whoami/healthCheckIndicator";
import { CehBadge } from "../../components/common/cehBadge";

const graphID = [
  "hoursOfCoding",
  "Languages",
  "AtcoderPerformanceAndRate",
  "AtcoderACCount",
];
const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); }
  25% { transform: scale(1.05) rotate(0); }
  50% { transform: scale(1) rotate(0); }
`;
type Props = {
  latestContest: AtcoderContestResult;
  acCount: number;
  solveCount: AtcoderAcResult;
  previousCount: AtcoderAcResult;
  contestParticipationCount: number;
  children: ReactNode;
} & AtcoderInfo &
  WakatimeInfo &
  HealthCheckInfo;

const animationTwoSecound = `${animationKeyframes} 2s ease-in-out infinite`;
const animationThreeSecound = `${animationKeyframes} 3s ease-in-out infinite`;
const animationFiveSecound = `${animationKeyframes} 5s ease-in-out infinite`;
const Home = (props: Props) => {
  const hoursOfCoding = props.daily_avg.data.current_user.total.text;
  const dailyAvg = props.daily_avg.data.current_user.daily_average.text;
  const languageData = props.language.data.languages;
  const { latestContest, acCount, contestParticipationCount, checks } = props;
  const today = new Date();
  const { day } = diffDates(new Date("2020-12-01"), today);
  const state = Object.fromEntries(
    graphID.map((x, i) => {
      if (i === 1 || i === 3) {
        return [x, true];
      } else {
        return [x, false];
      }
    })
  );
  const [graphState, setGraphState] = useState(state);
  const atcoderGraphInfo = convertAtcoderContestDataToGraphData(
    props.contestHistories,
    ATCODER_GRAPH_DATA_COUNT
  );
  const atcoderACInfo = convertAtcoderAcDataToGraphData(props.acCountHistories);
  const latestPerformanceColor = generateAtcoderGradientColor(
    latestContest.Performance
  );

  return (
    <>
      <Head>
        <title>Hut K - Whoami</title>
        <meta name="description" content="introduce who I am" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        <Container
          maxW={{ base: "100%", md: "80%" }}
          py={5}
          centerContent={true}
        >
          <Container
            maxW={{ base: "100%", md: "70%" }}
            centerContent={true}
            pb={6}
          >
            <HealthCheckIndicator checks={checks} />
          </Container>
          <Container
            maxW={"100%"}
            pt={4}
            centerContent={true}
            bgColor="gray.900"
          >
            <Heading size="xl" py={4}>
              Who am I ?
            </Heading>
            <DownloadButton
              colorScheme="purple"
              variant="outline"
              href="/sojiro_koyama_resume.pdf"
              label="Resume"
            />
            <Show above="lg">
              <Stack
                w="100%"
                direction={{ sm: "column", md: "column", lg: "row" }}
                py={6}
              >
                <Accordion allowToggle w="100%">
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="center">
                          ALL ABOUT ME! (Google Slide)
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Center>
                        <iframe
                          src="https://docs.google.com/presentation/d/e/2PACX-1vQm6IcA8uRX6hFs4zmhfBojTZihReX0JfBtdyXcIuqGsJxgUAGi7VVBWpSV3e46R1v1K5Kg9NWLR0Ii/embed?start=false&loop=false&delayms=3000"
                          frameBorder="0"
                          width="960"
                          height="569"
                          allowFullScreen={true}
                        ></iframe>
                      </Center>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Stack>
            </Show>

            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 4, md: 8 }}
              pt={4}
              pb={2}
              mx={2}
              w={{ base: "100%", md: "75%" }}
            >
              <Stat border="1px" borderColor="gray.200" p={2} borderRadius="lg">
                <StatLabel>Days since I became an Engineer</StatLabel>
                <StatNumber>{day} days</StatNumber>
                <StatHelpText>2020-12-01 ~ {getPastDate(0)}</StatHelpText>
              </Stat>
              <Stat
                as={motion.div}
                animation={animationTwoSecound}
                border="1px"
                borderColor="gray.200"
                bgColor="purple.900"
                p={2}
                borderRadius="lg"
                boxShadow={graphState[`${graphID[0]}`] ? "2xl" : ""}
                opacity={graphState[`${graphID[0]}`] ? "1.0" : "0.7"}
                id={graphID[0]}
                onMouseOver={(e) => {
                  const state = { ...graphState };
                  Object.keys(state).forEach((k) => {
                    if (k === graphID[1]) {
                      state[k] = false;
                    }
                  });
                  setGraphState({ ...state, [e.currentTarget.id]: true });
                }}
              >
                <StatLabel>This year&apos;s hours of coding</StatLabel>
                <StatNumber>{hoursOfCoding}</StatNumber>
                <StatHelpText>Daily Avg: {dailyAvg}</StatHelpText>
              </Stat>
              <Stat
                border="1px"
                borderColor="gray.200"
                p={2}
                as={motion.div}
                animation={animationThreeSecound}
                borderRadius="lg"
                bgColor="blue.900"
                id={graphID[1]}
                boxShadow={graphState[`${graphID[1]}`] ? "2xl" : ""}
                opacity={graphState[`${graphID[1]}`] ? "1.0" : "0.7"}
                onMouseOver={(e) => {
                  const state = { ...graphState };
                  Object.keys(state).forEach((k) => {
                    if (k === graphID[0]) {
                      state[k] = false;
                    }
                  });
                  setGraphState({ ...state, [e.currentTarget.id]: true });
                }}
              >
                <StatLabel>Most used language</StatLabel>
                <StatNumber>
                  <Box>{languageData[0].name}</Box>
                </StatNumber>
                <StatLabel>
                  Total Hours:{" "}
                  <Text as="em">
                    {(languageData[0].total_seconds / 3600)
                      .toString()
                      .substring(0, 6)}{" "}
                    Hs
                  </Text>
                </StatLabel>
              </Stat>
            </Stack>
            {graphState[`${graphID[1]}`] ? (
              <Box
                position="relative"
                h={{ base: "80vw", md: "25vw" }}
                w={{ base: "80vw", md: "29vw" }}
                my={8}
              >
                <PolarGraph
                  data={convertWakatimeLanguagesDataToGraphData(
                    props.language,
                    5
                  )}
                  title={`Top 5 ${graphID[1]}`}
                />
              </Box>
            ) : graphState[`${graphID[0]}`] ? (
              <Box
                position="relative"
                h={{ base: "50vw", md: "25vw" }}
                w={{ base: "80vw", md: "45vw" }}
                my={8}
              >
                <BarGraph
                  data={convertWakatimeActivitiesDataToGraphData(
                    props.activities,
                    7
                  )}
                  title="Last 7 days Activities"
                />
              </Box>
            ) : (
              <></>
            )}
            <Box
              position="relative"
              h={{ base: "50vw", md: "25vw" }}
              w={{ base: "80vw", md: "45vw" }}
              my={8}
            >
              {graphState[`${graphID[2]}`] ? (
                <BarandLineGraph
                  graphData={atcoderGraphInfo.graphData}
                  lineData={atcoderGraphInfo.lineData}
                  barData={atcoderGraphInfo.barData}
                  title="Atcoder Rate and Performance"
                />
              ) : graphState[`${graphID[3]}`] ? (
                <ScatterGraph data={atcoderACInfo.graphData} title="" />
              ) : (
                <></>
              )}
            </Box>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 4, md: 8 }}
              pt={4}
              pb={2}
              mx={2}
              w={{ base: "100%", md: "75%" }}
            >
              <Stat
                flex="2"
                border="1px"
                borderColor="gray.200"
                p={2}
                as={motion.div}
                animation={animationFiveSecound}
                borderRadius="lg"
                boxShadow={graphState[`${graphID[2]}`] ? "2xl" : ""}
                bgGradient={`linear(to-t, ${latestPerformanceColor.color} ,black ${latestPerformanceColor.ratio}%)`}
                id={graphID[2]}
                opacity={graphState[`${graphID[2]}`] ? "1.0" : "0.7"}
                onMouseOver={(e) => {
                  const state = { ...graphState };
                  Object.keys(state).forEach((k) => {
                    if (k === graphID[3]) {
                      state[k] = false;
                    }
                  });
                  setGraphState({ ...state, [e.currentTarget.id]: true });
                }}
              >
                <StatLabel>Latest Atcoder Contest</StatLabel>
                <StatNumber>
                  Performance: {latestContest.Performance}
                </StatNumber>
                <StatHelpText>
                  {latestContest.ContestScreenName.slice(0, 6)}
                </StatHelpText>
              </Stat>
              <Stat
                border="1px"
                borderColor="gray.200"
                animation={animationThreeSecound}
                as={motion.div}
                p={2}
                borderRadius="lg"
                boxShadow="md"
                id={graphID[3]}
                opacity={graphState[`${graphID[3]}`] ? "1.0" : "0.7"}
                onMouseOver={(e) => {
                  const state = { ...graphState };
                  Object.keys(state).forEach((k) => {
                    if (k === graphID[2]) {
                      state[k] = false;
                    }
                  });
                  setGraphState({ ...state, [e.currentTarget.id]: true });
                }}
              >
                <StatLabel>Atcoder AC counts</StatLabel>
                <StatNumber pr={4}>
                  {acCount} ({props.solveCount.ac_rank}th){" "}
                </StatNumber>
                <StatHelpText>
                  <AtcoderSolveDelta
                    previous={props.previousCount}
                    latest={props.solveCount}
                  />
                </StatHelpText>
              </Stat>
            </Stack>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 4, md: 8 }}
              pt={4}
              pb={2}
              mx={2}
              w={{ base: "100%", md: "75%" }}
            >
              <Box
                w={{ base: "100%", md: "50%" }}
                boxShadow={graphState[`${graphID[2]}`] ? "2xl" : ""}
                id={graphID[2]}
                opacity={graphState[`${graphID[2]}`] ? "1.0" : "0.7"}
              >
                <AtcoderRateIndicatior
                  oldRating={latestContest.OldRating}
                  newRating={latestContest.NewRating}
                />
              </Box>
              <Stat
                border="1px"
                borderColor="gray.200"
                ml={2}
                p={2}
                borderRadius="lg"
              >
                <StatLabel>Number of Atcoder contest entries</StatLabel>
                <StatNumber>
                  <Text as="i">{contestParticipationCount} </Text>
                  times
                </StatNumber>
                <StatHelpText>
                  Last participation: {latestContest.EndTime.substring(0, 10)}
                </StatHelpText>
              </Stat>
            </Stack>
          </Container>
          <Container
            maxW={"100%"}
            py={2}
            centerContent={true}
            bgColor="gray.900"
          >
            <Heading size="xl" py={4}>
              Achivement
            </Heading>
            <Flex>
              <AwsBadge width={200} height={200} />
              <CehBadge width={200} height={200} />
            </Flex>
          </Container>
        </Container>
      </NavBar>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { language, daily_avg, activities } = getLatestWakatimeInfo();
  const { contestHistories, acCountHistories } = getLatestAtcoderInfo();
  const { checks } = getLatestHealthChecksInfo();
  const latestContest = contestHistories[contestHistories.length - 1];
  const acCount = acCountHistories[acCountHistories.length - 1].ac_count;
  const solveCount = acCountHistories[acCountHistories.length - 1];
  const previousCount =
    acCountHistories.length > 1
      ? acCountHistories[acCountHistories.length - 2]
      : acCountHistories[acCountHistories.length - 1];
  const contestParticipationCount = contestHistories.length;
  return {
    props: {
      language,
      daily_avg,
      activities,
      acCountHistories,
      contestHistories,
      latestContest,
      acCount,
      solveCount,
      previousCount,
      contestParticipationCount,
      checks,
    },
  };
};
