"use client";
// import axiosRequest from "@/api";
// import { ResData, UserFriend } from "@/@types";

import { useState, useEffect } from "react";
// import { useRecoilState } from "recoil";
// import { followerState, followingState } from "@/recoil/atoms/friend.atom";

import * as S from "./page.styled";

import SearchForm from "@/app/mypage/SearchForm";
import Line from "@/components/common/Line";
// import Followers from "./Followers";
// import Followings from "./Followings";

export default function FriendList() {
  const [selectedMenu, setSelectedMenu] = useState("닉네임");
  const dropDownProps = {
    menuList: ["닉네임", "계정"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
    placeholder: "친구 목록에서 검색합니다.",
  };

  const [tab, setTab] = useState("followers");
  // const [followers, setFollowers] = useRecoilState(followerState);
  // const [followings, setFollowings] = useRecoilState(followingState);

  // //팔로워 조회
  // //무한스크롤 추후 적용 - 수정예정
  // async function getFollowers() {
  //   try {
  //     const response = await axiosRequest.requestAxios<ResData<UserFriend[]>>("get", `/user/followers`);
  //     setFollowers(response.data);
  //     console.log("followers", response.data);
  //   } catch (error) {
  //     alert("팔로워 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
  //     console.error("Error fetching followers data: ", error);
  //   }
  // }
  // //팔로잉 조회
  // //무한스크롤 추후 적용 - 수정예정
  // async function getFollowings() {
  //   try {
  //     const response = await axiosRequest.requestAxios<ResData<UserFriend[]>>("get", `/user/following`);
  //     setFollowings(response.data);
  //     console.log("followers", response.data);
  //   } catch (error) {
  //     alert("팔로잉 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
  //     console.error("Error fetching followings data: ", error);
  //   }
  // }
  // useEffect(() => {
  //   if (followers.length === 0) getFollowers();
  //   if (followings.length === 0) getFollowings();
  // }, []);

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.FollowerNumber clicked={tab === "followers"}>
            <S.Title onClick={() => setTab("followers")}>팔로워</S.Title>
            <S.Number>{followers.length}</S.Number>
          </S.FollowerNumber>
          <Line color="gray" size="vertical" />
          <S.FollowingNumber clicked={tab === "followings"}>
            <S.Title onClick={() => setTab("followings")}>팔로잉</S.Title>
            <S.Number>{followings.length}</S.Number>
          </S.FollowingNumber>
        </div>
        <SearchForm select={dropDownProps} />
      </S.Header>
      <S.MainContainer>
        {tab === "followers" ? <Followers data={followers} /> : <Followings data={followings} />}
        <S.ShowMoreBtn>목록 더보기</S.ShowMoreBtn>
      </S.MainContainer>
    </S.Container>
  );
}
