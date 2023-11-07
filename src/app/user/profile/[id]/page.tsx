"use client";
import axiosRequest from "@/api/index";
import { ResData, Planet, PostingsType, PlanetsType, Posting } from "@/@types";

import { useState } from "react";

import * as S from "./page.styled";

import Line from "@/components/common/Line";
import Nothing from "@/components/common/Nothing";
import Planets from "@/app/user/profile/Planets";
import Postings from "@/app/user/profile/Postings";
import ProfileSummary from "@/app/user/profile/ProfileSummary";

interface ProfileParams {
  id: number;
}
export default function Profile({ params }: { params: ProfileParams }) {
  const userId = params.id;

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
          font="lg"
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
          font="lg"
        />
      ),
    },
    {
      title: "행성목록",
      content: tabIndex === 2 && <Planets id={userId} />,
    },
    {
      title: "게시글",
      content: tabIndex === 3 && <Postings id={userId} />,
    },
  ];

  return (
    <S.Container>
      <ProfileSummary id={userId} />
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

        <S.MainContent>{TabList[tabIndex].content}</S.MainContent>
      </S.MainContainer>
    </S.Container>
  );
}
