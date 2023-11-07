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
import MESSAGE from "@/constants/message";

interface ProfileParams {
  id: number;
}
export default function Profile({ params }: { params: ProfileParams }) {
  const userId = params.id;

  const [tabIndex, setTabIndex] = useState(0);

  const [planets, setPlanets] = useState<Planet[]>([]);

  const selectTab = (idx: number) => {
    setTabIndex(idx);
  };

  //행성 불러오기
  async function getPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<PlanetsType>>(
        "get",
        `/planet/other/${userId}/ownerships`,
      );
      setPlanets(response.data.data);
      //   console.log("planets", planets);
    } catch (error) {
      console.error("행성 정보를 가져오는중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  }

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
      content:
        planets.length === 0 ? (
          <Nothing
            src="/assets/img/icons/no-planets.svg"
            alt="no-TravelingPlanets"
            width={148}
            height={148}
            comment="여행 중인 행성이 없습니다."
            font="lg"
          />
        ) : (
          <Planets data={planets} />
        ),
    },
    {
      title: "게시글",
      content: tabIndex === 3 && <Postings id={userId} />,
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

        <S.MainContent>{TabList[tabIndex].content}</S.MainContent>
      </S.MainContainer>
    </S.Container>
  );
}
