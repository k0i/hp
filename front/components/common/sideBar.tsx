import React, { ReactNode, ReactText } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
  Spacer,
  Center,
  VStack,
  ListItem,
  List,
  ListIcon,
  Link,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Article } from "../../types/article";
import { RiArticleFill } from "react-icons/ri";
import NextLink from "next/link";
export const SimpleSidebar = ({
  children,
  toc,
  articles,
}: {
  children: ReactNode;
  toc: ReactNode;
  articles: Article[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <SidebarContent
        toc={toc}
        onClose={() => onClose}
        articles={articles}
        display={{ base: "none", md: "block" }}
        mx={1}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent onClick={onClose} bgColor="gray.800">
          <SidebarContent articles={articles} onClose={onClose} toc={toc} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 330 }} pb={50}>
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
  toc: ReactNode;
  articles: Article[];
}

const SidebarContent = ({ onClose, toc, articles, ...rest }: SidebarProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box
      w={{ base: "full", md: 300 }}
      pos="fixed"
      h="full"
      rounded={"2xl"}
      {...rest}
    >
      <Center>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Center>
      <Flex
        h="20"
        alignItems="center"
        justifyContent="center"
        bgColor="gray.800"
        mb="20px"
        rounded={"xl"}
      >
        <Button onClick={scrollToTop} variant="outline" color="purple.300">
          Top
        </Button>
      </Flex>
      {toc}
      <Spacer h="20px" />
      <Box>
        <Center bgColor="gray.900" rounded={"xl"}>
          <VStack py={4}>
            <Text fontSize="md" as="b">
              最新記事
            </Text>
            <List spacing={3} px={4}>
              {articles.map((a) => (
                <NextLink href={`/articles/${a.id}`} passHref key={a.id}>
                  <Link>
                    <ListItem
                      _hover={{ boxShadow: "sm", bgColor: "gray.600" }}
                      key={a.id}
                    >
                      <ListIcon as={RiArticleFill} color="gray.500" />
                      {a.title}
                    </ListItem>
                  </Link>
                </NextLink>
              ))}
            </List>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
