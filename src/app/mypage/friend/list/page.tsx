"use client";
import { useState } from "react";

import * as S from "./page.styled";

import SearchForm from "@/app/mypage/SearchForm";
import Line from "@/components/common/Line";
import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";

export default function FriendList() {
  const [selectedMenu, setSelectedMenu] = useState("닉네임");
  const dropDownProps = {
    menuList: ["닉네임", "계정"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
    placeholder: "친구 목록에서 검색합니다.",
  };

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.FollowerNumber>
            <S.Title>팔로워</S.Title>
            <Number>102</Number>
          </S.FollowerNumber>
          <Line color="gray" size="vertical" />
          <S.FollowingNumber>
            <S.Title>팔로잉</S.Title>
            <Number>3,888</Number>
          </S.FollowingNumber>
        </div>
        <SearchForm select={dropDownProps} />
      </S.Header>
      <S.MainContainer>
        <Nothing
          src="/assets/img/icons/no-friends.svg"
          alt="no-friends"
          width={216}
          height={216}
          comment="등록된 친구가 없습니다."
          suggest="닉네임 또는 계정을 검색해 보세요."
          font="lg"
        />

        <S.MyFriends>
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
          <Person />
        </S.MyFriends>
        <S.ShowMoreBtn>목록 더보기</S.ShowMoreBtn>
      </S.MainContainer>
    </S.Container>
  );
}
