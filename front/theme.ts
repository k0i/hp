import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        lineHeight: "220%",
        bgColor: "black",
        color: "gray.100",
        fontSize: "16px",
      },
      a: {
        color: "teal.500",
      },
    },
  },
});
