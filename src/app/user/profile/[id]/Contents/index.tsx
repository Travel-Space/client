"use client";

import { useState } from "react";

import * as S from "./index.styled";

import Line from "@/components/common/Line";
import Planets from "@/app/user/profile/Planets";
import Postings from "@/app/user/profile/Postings";
import Followers from "../../Followers";
import Followings from "../../Followings";

export default function Contents({ id }: { id: number }) {
  const [tabIndex, setTabIndex] = useState(0);

  const selectTab = (idx: number) => {
    setTabIndex(idx);
  };

  const TabList = [
    {
      title: "팔로워",
      content: tabIndex === 0 && <Followers id={id} />,
    },
    {
      title: "팔로잉",
      content: tabIndex === 1 && <Followings id={id} />,
    },
    {
      title: "행성목록",
      content: tabIndex === 2 && <Planets id={id} />,
    },
    {
      title: "게시글",
      content: tabIndex === 3 && <Postings id={id} />,
    },
  ];
  return (
    <S.Container>
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
    </S.Container>
  );
}
