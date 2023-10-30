"use client";
import axiosRequest from "@/api";
import { ResData, Follower } from "@/@types";

import { useRecoilState, useRecoilValue } from "recoil";
import { followerState, notMutualState } from "@/recoil/atoms/friend.atom";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import * as S from "./page.styled";

import RecommendFriend from "./RecommendFriend";
import SearchForm from "@/app/mypage/SearchForm";
import Person from "@/app/mypage/friend/Person";
import Nothing from "@/components/common/Nothing";

export default function Planet() {
  const [selectedMenu, setSelectedMenu] = useState("닉네임");
  const dropDownProps = {
    menuList: ["닉네임", "계정"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
    placeholder: "친구 추가에서 검색합니다.",
  };

  const [followers, setFollowers] = useRecoilState(followerState);
  const notMutual = useRecoilValue(notMutualState);

  //팔로워 조회
  //무한스크롤 추후 적용 - 수정예정
  async function getFollowers() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Follower[]>>("get", `/user/followers`);
      setFollowers(response.data);
      console.log("followers", response.data);
    } catch (error) {
      alert("팔로워 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followers data: ", error);
    }
  }

  useEffect(() => {
    console.log(notMutual);
    if (followers.length === 0) getFollowers();
  }, []);

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
          {/* notMutual 수정되면 수정예정 */}
          {followers.map((el, idx) => (
            <SwiperSlide>
              <RecommendFriend key={`notMutualFriend${idx}`} data={el} />
            </SwiperSlide>
          ))}
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
          font="lg"
        />
        {/* 검색기능추가되면 수정예정 */}
      </S.SearchResults>
      <S.ShowMoreBtn>목록 더보기</S.ShowMoreBtn>
    </S.Container>
  );
}
