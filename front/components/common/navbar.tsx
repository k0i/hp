import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useColorModeValue,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";
import NextLink from "next/link";

const Links: Array<{ name: string; path: string }> = [
  { name: "Top", path: "/" },
  { name: "Whoami", path: "/whoami" },
  { name: "Articles", path: "/articles" },
];

const NavLink = ({
  name,
  path,
  highlight,
}: {
  name: string;
  path: string;
  highlight: boolean;
}) => (
  <NextLink href={path} passHref>
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "underline",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={path}
    >
      {highlight ? (
        <Button color="gray.700" bg="gray.800" isDisabled={true}>
          {name}
        </Button>
      ) : (
        <Button color="purple.500" bg="gray.700">
          {name}
        </Button>
      )}
    </Link>
  </NextLink>
);

export const NavBar = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <Box bg="gray.900" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.name}
                  name={link.name}
                  path={link.path}
                  highlight={router.pathname === link.path}
                />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Heading fontWeight={600} fontSize="xl">
              Blog Hut_
              <Text as="em" color={"orange.400"}>
                K
              </Text>
            </Heading>
            <Link href="https://github.com/k0i/hp" isExternal>
              <IconButton
                aria-label="Github Repository"
                fontSize="30px"
                bg="gray.900"
                icon={<FaGithub />}
                ml={10}
              />
            </Link>
          </Flex>
        </Flex>
      </Box>
      <Box>{children}</Box>
    </>
  );
};
