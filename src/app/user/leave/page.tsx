"use client";
import * as S from "./page.styled";

import Line from "@/components/common/Line";

import PrivacyNotice from "./PrivacyNotice";
import Confirm from "./Confirm";
import Guide from "./Guide";

export default function Leave() {
  return (
    <S.Container>
      <S.MainTitle>회원 탈퇴</S.MainTitle>
      <S.Comment>회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.</S.Comment>
      <Guide />
      <PrivacyNotice />
      <Line color="gray" size="horizontal" />
      <Confirm />
    </S.Container>
  );
}
