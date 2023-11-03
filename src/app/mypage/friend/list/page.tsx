"use client";
import axiosRequest from "@/api";
import { ResData, Follower, Following } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { followerState, followingState } from "@/recoil/atoms/friend.atom";

import * as S from "./page.styled";

import SearchForm from "@/app/mypage/SearchForm";
import Line from "@/components/common/Line";
import Followers from "./Followers";
import Followings from "./Followings";

export default function FriendList() {
  const [selectedMenu, setSelectedMenu] = useState("닉네임");
  const dropDownProps = {
    menuList: ["닉네임", "계정"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
    placeholder: "친구 목록에서 검색합니다.",
  };

  const [tab, setTab] = useState("followers");
  const [followers, setFollowers] = useRecoilState(followerState);
  const [followings, setFollowings] = useRecoilState(followingState);
  const [page, setPage] = useState(1);
  const limit = 1; //수정예정

  //팔로잉 조회
  async function getFollowings(page: number, limit: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Following[]>>(
        "get",
        `/user/following?page=${page}&limit=${limit}`,
      );
      const followings = response.data;
      if (page === 1) setFollowings(followings);
      else setFollowings(prev => [...prev, ...followings]);
      // console.log("followings", response.data);
    } catch (error) {
      alert("팔로잉 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followings data: ", error);
    }
  }
  //팔로워 조회
  async function getFollowers(page: number, limit: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Follower[]>>(
        "get",
        `/user/followers?page=${page}&limit=${limit}`,
      );
      const followers = response.data;
      if (page === 1) setFollowers(followers);
      else setFollowers(prev => [...prev, ...followers]);
      // console.log("followings", response.data);
    } catch (error) {
      alert("팔로워 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followers data: ", error);
    }
  }
  const loadData = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    console.log("page", page);

    getFollowings(page, limit);
    getFollowers(page, limit);
  }, [page]);
  useEffect(() => {
    getFollowings(page, limit);
    getFollowers(page, limit);
  }, []);

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.FollowerNumber clicked={tab === "followers"}>
            <S.Title onClick={() => setTab("followers")}>팔로워</S.Title>
            {/* <S.Number>{followers.length}</S.Number> */}
          </S.FollowerNumber>
          <Line color="gray" size="vertical" />
          <S.FollowingNumber clicked={tab === "followings"}>
            <S.Title onClick={() => setTab("followings")}>팔로잉</S.Title>
            {/* <S.Number>{followings.length}</S.Number> */}
          </S.FollowingNumber>
        </div>
        <SearchForm select={dropDownProps} />
      </S.Header>
      <S.MainContainer>
        {tab === "followers" ? (
          <Followers loadData={loadData} page={page} limit={limit} />
        ) : (
          <Followings loadData={loadData} page={page} limit={limit} />
        )}
      </S.MainContainer>
    </S.Container>
  );
}
