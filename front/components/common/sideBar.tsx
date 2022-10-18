import React, { ReactNode, ReactText } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
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
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export const SimpleSidebar = ({
  children,
  toc,
}: {
  children: ReactNode;
  toc: ReactNode;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        toc={toc}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
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
        <DrawerContent onClick={onClose}>
          <SidebarContent onClose={onClose} toc={toc} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 290 }} px={20} bgColor="white">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
  toc: ReactNode;
}

const SidebarContent = ({ onClose, toc, ...rest }: SidebarProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box
      bg="gray.100"
      w={{ base: "full", md: 280 }}
      pos="fixed"
      h="full"
      rounded={"2xl"}
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        justifyContent="center"
        bgColor="white"
        mb="20px"
      >
        <Button onClick={scrollToTop} variant="outline" color="purple.300">
          Top
        </Button>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {toc}
      <Spacer h="20px" />
      <Box>
        <Center bgColor="white">
          <VStack>
            <Text fontSize="md" as="b">
              最新記事
            </Text>
            <OrderedList>
              <ListItem _hover={{ boxShadow: "sm", bgColor: "gray.50" }} py="2">
                Lorem ipsum dolor sit amet
              </ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </OrderedList>
          </VStack>
        </Center>
      </Box>
      <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
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
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
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
