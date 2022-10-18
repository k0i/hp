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
}

export const BlogPostWithImage = ({ title, content, createdAt, id }: Props) => {
  return (
    <Center py={3}>
      <Link href={`articles/${id}`}>
        <a>
          <Box
            maxW={"445px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"md"}
            _hover={{ boxShadow: "2xl", bgColor: "blackAlpha.900" }}
            rounded={"xl"}
            p={4}
            overflow={"hidden"}
          >
            <Stack>
              <Text
                color={"green.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}
              >
                <TagLiner
                  tags={[
                    { size: "sm", key: "key", label: "react", color: "purple" },
                    { size: "sm", key: "key2", label: "rust", color: "teal" },
                    { size: "sm", key: "key3", label: "DB", color: "cyan" },
                  ]}
                />
              </Text>
              <Heading
                color={useColorModeValue("gray.700", "white")}
                fontSize={"2xl"}
                fontFamily={"body"}
              >
                {title}
              </Heading>
              <Text color={"gray.500"}>{content.slice(0, 100)}...</Text>
            </Stack>
            <Stack
              mt={6}
              direction={"row"}
              spacing={4}
              align={"center"}
              justifyContent="end"
            >
              <Avatar icon={<AiOutlineUser fontSize="1.5rem" />} />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>k0i</Text>
                <Text color={"gray.500"}>{createdAt.slice(0, 10)}</Text>
              </Stack>
            </Stack>
          </Box>
        </a>
      </Link>
    </Center>
  );
};
