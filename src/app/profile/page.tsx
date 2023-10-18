"use client";
import { useState } from "react";
import * as S from "./page.styled";

import ProfileSummary from "./ProfileSummary";
import Line from "@/components/common/Line";
import Nothing from "../mypage/Nothing";

export default function Profile({ children }: { children: React.ReactNode }) {
  const [tabIndex, setTabIndex] = useState(0);
  const selectTab = (idx: number) => {
    setTabIndex(idx);
  };
  const TabList = [
    {
      title: "팔로워",
      content: (
        <Nothing
          src="/assets/img/icons/no-friends.svg"
          alt="no-friends"
          width={216}
          height={216}
          comment="등록된 친구가 없습니다."
        />
      ),
    },
    {
      title: "팔로잉",
      content: (
        <Nothing
          src="/assets/img/icons/no-friends.svg"
          alt="no-friends"
          width={216}
          height={216}
          comment="등록된 친구가 없습니다."
        />
      ),
    },
    {
      title: "행성목록",
      content: (
        <Nothing
          src="/assets/img/icons/no-planets.svg"
          alt="no-TravelingPlanets"
          width={148}
          height={148}
          comment="여행 중인 행성이 없습니다."
        />
      ),
    },
    {
      title: "게시글",
      content: (
        <Nothing
          src="/assets/img/icons/no-postings.svg"
          alt="no-postings"
          width={96}
          height={96}
          comment="작성된 게시글이 없습니다."
        />
      ),
    },
  ];

  return (
    <S.Container>
      <ProfileSummary />
      <S.MainContainer>
        <S.TabListWrap selectedTab={tabIndex}>
          {TabList.map((el, idx) => (
            <S.Tab
              key={idx}
              title={el.title}
              onClick={() => {
                selectTab(idx);
              }}
            >
              {el.title}
            </S.Tab>
          ))}
        </S.TabListWrap>
        <Line color="gray" size="horizontal" />
        <S.MainContent>
          {TabList[tabIndex].content}
          {children}
        </S.MainContent>
      </S.MainContainer>
    </S.Container>
  );
}
