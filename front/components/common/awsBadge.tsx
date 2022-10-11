import React from "react";
import Image from "next/image";
import { Link } from "@chakra-ui/react";

export const AwsBadge = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => (
  <Link
    isExternal
    href="https://www.credly.com/badges/2b11e2e6-14ea-4cb0-b13e-b064f3c56a6e/public_url"
  >
    <Image src="/aws.png" width={width} height={height} alt="aws certificate" />
  </Link>
);
