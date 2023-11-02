import React from "react";
import { HeartIcon } from "./index.styled";

interface HeartAnimationProps {
  color: string;
}

export default function HeartAnimation({ color }: HeartAnimationProps) {
  return (
    <>
      <HeartIcon viewBox="0 0 1024 1024" style={{ fill: color }}> {/* Use the color prop */}
        <path
          className="heart-path"
          d="M742.4 101.12A249.6 249.6 0 0 0 512 256a249.6 249.6 0 0 0-230.72-154.88C143.68 101.12 32 238.4 32 376.32c0 301.44 416 546.56 480 546.56s480-245.12 480-546.56c0-137.92-111.68-275.2-249.6-275.2z"
        ></path>
      </HeartIcon>
    </>
  );
}