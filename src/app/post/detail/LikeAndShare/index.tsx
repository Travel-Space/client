"use client";

import React from "react";
import * as LS from "./index.styled";

export default function LikeAndShare() {
  return (
    <LS.Wrapper>
      <LS.Like>
        좋아요 <LS.LikeBtn src="/assets/img/icons/gray-heart.svg" />
      </LS.Like>
      <div>
        <LS.VerticaLine src="/assets/img/icons/vertical-line.svg" />
      </div>
      <LS.Share>
        공유하기
        <LS.ShareBtn src="/assets/img/icons/share.svg" />
      </LS.Share>
    </LS.Wrapper>
  );
}
