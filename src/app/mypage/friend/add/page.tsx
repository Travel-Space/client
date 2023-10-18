"use client";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import * as S from "./page.styled";

import RecommendFriend from "./RecommendFriend";
import SearchForm from "@/app/mypage/SearchForm";
import Person from "../Person";
import Nothing from "@/app/mypage/Nothing";

export default function Planet() {
  const [selectedMenu, setSelectedMenu] = useState("닉네임");
  const dropDownProps = {
    menuList: ["닉네임", "계정"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
    placeholder: "친구 추가에서 검색합니다.",
  };

  return (
    <S.Container>
      <S.Row>
        <S.Title>추천 친구</S.Title>
        <SearchForm select={dropDownProps} />
      </S.Row>
      <S.SwiperWrap>
        <Swiper
          slidesPerView={5}
          slidesPerGroup={5}
          spaceBetween={24}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <RecommendFriend />
          </SwiperSlide>
          <SwiperSlide>
            <RecommendFriend />
          </SwiperSlide>
          <SwiperSlide>
            <RecommendFriend />
          </SwiperSlide>
          <SwiperSlide>
            <RecommendFriend />
          </SwiperSlide>
          <SwiperSlide>
            <RecommendFriend />
          </SwiperSlide>
          <SwiperSlide>
            <RecommendFriend />
          </SwiperSlide>
          <SwiperSlide>
            <RecommendFriend />
          </SwiperSlide>
          <SwiperSlide>
            <RecommendFriend />
          </SwiperSlide>
          <SwiperSlide>
            <RecommendFriend />
          </SwiperSlide>
        </Swiper>
      </S.SwiperWrap>

      <S.SearchResults>
        <Nothing
          src="/assets/img/icons/no-friends.svg"
          alt="no-friends"
          width={216}
          height={216}
          comment="검색결과가 없습니다."
          suggest="닉네임 또는 계정을 검색해 보세요."
        />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
      </S.SearchResults>
      <S.ShowMoreBtn>목록 더보기</S.ShowMoreBtn>
    </S.Container>
  );
}
