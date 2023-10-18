"use client";

import React from "react";
import * as LS from "./index.styled";
import Line from "@/components/common/Line";

export default function LikeAndShare() {
  return (
    <LS.Wrapper>
      <LS.Like>
        좋아요 <LS.LikeBtn src="/assets/img/icons/gray-heart.svg" />
      </LS.Like>
      <LS.VerticaLine>
        <Line size="vertical" color="gray" />
      </LS.VerticaLine>
      <LS.Share>
        공유하기
        <LS.ShareBtn src="/assets/img/icons/share.svg" />
      </LS.Share>
    </LS.Wrapper>
  );
}
