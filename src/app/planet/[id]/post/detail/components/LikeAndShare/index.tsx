"use client";

import React, { useEffect, useState } from "react";
import * as LS from "./index.styled";
import Line from "@/components/common/Line";
import HeartAnimation from "@/components/common/HeartAnimation";

interface LikeAndShareProps {
  likedStatus: boolean | null;
  onLikeToggle: () => void;
}

export default function LikeAndShare({ likedStatus, onLikeToggle }: LikeAndShareProps) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          alert("링크가 복사되었습니다.");
        })
        .catch(() => {
          alert("복사를 다시 시도해 주세요.");
        });
    } else {
      alert("이 브라우저에서는 지원하지 않는 기능입니다.");
    }
  };

  const heartColor = likedStatus ? "var(--c, #ff6b81)" : "#eee";

  return (
    <LS.Wrapper>
      <LS.Like onClick={onLikeToggle}>
        좋아요
        {likedStatus ? <HeartAnimation color={heartColor} /> : <LS.LikeBtn src="/assets/img/icons/gray-heart.svg" />}
      </LS.Like>
      <LS.VerticaLine>
        <Line size="vertical" color="gray" />
      </LS.VerticaLine>
      <LS.Share onClick={handleShareClick}>
        공유하기
        <LS.ShareBtn src="/assets/img/icons/share.svg" />
      </LS.Share>
    </LS.Wrapper>
  );
}
