import React from "react";
import Image from "next/image";
import { Link } from "@chakra-ui/react";

export const CehBadge = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => (
  <Link
    isExternal
    href="https://hpkoyama.s3.ap-northeast-1.amazonaws.com/Exam-Transcript.pdf"
  >
    <Image src="/ceh.png" width={width} height={height} alt="aws certificate" />
  </Link>
);
