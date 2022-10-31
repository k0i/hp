import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        lineHeight: "200%",
        bgColor: "black",
        color: "gray.200",
        fontSize: "md",
      },
      a: {
        color: "teal.500",
      },
    },
  },
});
