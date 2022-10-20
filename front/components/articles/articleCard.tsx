import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { TagLiner } from "./tagLiner";
import { AiOutlineUser } from "react-icons/ai";

interface Props {
  title: string;
  content: string;
  createdAt: string;
  id: string;
  tags: { size: string; key: string; name: string; color: string }[];
}

export const BlogPostWithImage = ({
  title,
  content,
  createdAt,
  id,
  tags,
}: Props) => {
  return (
    <Center py={3}>
      <Link href={`articles/${id}`}>
        <a>
          <Box
            maxW="90%"
            h="300px"
            bg="gray.900"
            boxShadow={"md"}
            border="1px"
            borderColor="white"
            _hover={{ boxShadow: "2xl", bgColor: "blackAlpha.900" }}
            rounded={"xl"}
            p={4}
            overflow={"hidden"}
          >
            <Stack>
              <TagLiner tags={tags} />
              <Heading color="gray.200" fontSize={"2xl"} fontFamily={"body"}>
                {title}
              </Heading>
              <Text color={"gray.300"}>{content.slice(0, 70)}...</Text>
            </Stack>
            <Stack
              mt={6}
              direction={"row"}
              spacing={4}
              align={"center"}
              justifyContent="end"
            ></Stack>
          </Box>
        </a>
      </Link>
    </Center>
  );
};
