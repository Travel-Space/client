"use client";

import Ship from "./Ship";
import * as S from "./page.styled";
import Button from "@/components/common/Button";
import { useState } from "react";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

export default function SpaceShip() {
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showMemberModal, setShowMemberModal] = useState<boolean>(false);

  return (
    <S.Wrap>
      <S.Header>
        <Button variant="basic" size="normal" shape="large">
          <img src="/assets/img/icons/prev-white.svg" height={16} />
        </Button>
        <S.Title>일본 맛도리 여행</S.Title>
        <Button variant="basic" size="normal" shape="large">
          <S.CenterGroup>
            <span>탑승링크</span>
            <img src="/assets/img/icons/share-white.svg" height={16} />
          </S.CenterGroup>
        </Button>
      </S.Header>

      <S.List
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={24}
        grabCursor={false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(ship => (
          <SwiperSlide key={ship}>
            <Ship test={ship} />
          </SwiperSlide>
        ))}
      </S.List>

      <S.Footer>
        <S.MemberBtn>
          <Button variant="gradient" shape="large" size="big" onClick={() => setShowMemberModal(true)}>
            <S.CenterGroup>
              <img src="/assets/img/icons/users.svg" />
              <span>행성 멤버 관리</span>
            </S.CenterGroup>
          </Button>
        </S.MemberBtn>
        <S.ExitBtn onClick={() => setShowExitModal(true)}>행성 탈출 💥</S.ExitBtn>
      </S.Footer>

      {/* 
      {showExitPlanetModal ? (
        <ExitPlanetModal onClose={() => setShowExitModal(false)} planetTitle="일본 맛도리 여행" />
      ) : null}
      {showMemberManageModal ? <MemberManageModal onClose={() => setShowMemberModal(false)} /> : null} */}
    </S.Wrap>
  );
}
