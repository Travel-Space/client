"use client";

import React from "react";
import * as LS from "./index.styled";
import Line from "@/components/common/Line";

interface LikeAndShareProps {
  likedStatus: boolean;
  onLikeToggle: () => void;
}

export default function LikeAndShare({ likedStatus, onLikeToggle }: LikeAndShareProps) {
  return (
    <LS.Wrapper>
      <LS.Like onClick={onLikeToggle}>
        좋아요 
        <LS.LikeBtn src={likedStatus ? "/assets/img/icons/red-heart.svg" : "/assets/img/icons/gray-heart.svg"} />
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

