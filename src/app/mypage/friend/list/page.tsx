"use client";

import * as S from "./page.styled";

import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";

export default function Planet() {
  return (
    <S.Container>
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
    </S.Container>
  );
}
