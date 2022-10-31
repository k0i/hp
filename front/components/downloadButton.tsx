import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

type Props = {
  colorScheme: string;
  variant: string;
  href: string;
  label: string;
};
export const DownloadButton = ({
  colorScheme,
  variant,
  href,
  label,
}: Props) => (
  <Button
    rightIcon={<ExternalLinkIcon />}
    colorScheme={colorScheme}
    variant={variant}
    as="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    maxW="50%"
  >
    {label}
  </Button>
);
