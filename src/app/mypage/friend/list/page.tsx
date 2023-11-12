"use client";
import { SearchItem } from "@/@types";

import { useState } from "react";
import { useRecoilValue } from "recoil";
import { totalFollowersState, totalFollowingsState } from "@/recoil/atoms/friend.atom";

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

  const totalFollowers = useRecoilValue(totalFollowersState);
  const totalFollowings = useRecoilValue(totalFollowingsState);

  const [searchItem, setSearchItem] = useState<SearchItem>();

  const handleSearch = (item: SearchItem) => {
    setSearchItem(item);
    // console.log("searchItem", item);
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.FollowerNumber clicked={tab === "followers"}>
            <S.Title onClick={() => setTab("followers")}>팔로워</S.Title>
            <S.Number>{totalFollowers}</S.Number>
          </S.FollowerNumber>
          <Line color="gray" size="vertical" />
          <S.FollowingNumber clicked={tab === "followings"}>
            <S.Title onClick={() => setTab("followings")}>팔로잉</S.Title>
            <S.Number>{totalFollowings}</S.Number>
          </S.FollowingNumber>
        </div>
        <SearchForm select={dropDownProps} onSearch={handleSearch} />
      </S.Header>
      <S.MainContainer>
        {tab === "followers" ? <Followers searchItem={searchItem} /> : <Followings searchItem={searchItem} />}
      </S.MainContainer>
    </S.Container>
  );
}
