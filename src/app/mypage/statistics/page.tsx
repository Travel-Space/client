"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import * as S from "./page.styled";

import Divider from "@/app/mypage/Divider";
import PopularPosting from "./PopularPosting";
import DropDown from "@/components/common/DropDown";

export default function Statistics() {
  const [selectedMenu, setSelectedMenu] = useState("일본 맛도리 여행");
  const dropDownProps = {
    comment: "행성 선택",
    menuList: ["일본 맛도리 여행", "영국 맛도리 여행", "태국", "스위스 힐링 여행"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
  };

  return (
    <S.Container>
      <S.SummaryWrap>
        <S.SelectedPlanet>
          <S.Planet>
            <Image src="/assets/img/icons/planet-0.svg" alt="planet" width={30} height={30} />
            <span>{selectedMenu}</span>
          </S.Planet>
          <S.DropDownWrap>
            <DropDown font="md" shape="round" color="gray" props={dropDownProps} />
          </S.DropDownWrap>
        </S.SelectedPlanet>
        <S.Summary>
          <div>
            <S.SummaryTitle>오늘 방문 수</S.SummaryTitle>
            <S.Number>102</S.Number>
          </div>
          <Divider width="1px" height="43px" />
          <div>
            <S.SummaryTitle>누적 방문 수</S.SummaryTitle>
            <S.Number>3888</S.Number>
          </div>
          <Divider width="1px" height="43px" />
          <div>
            <S.SummaryTitle>게시글 수</S.SummaryTitle>
            <S.Number>367</S.Number>
          </div>
        </S.Summary>
      </S.SummaryWrap>

      <S.Statistics>
        <div>
          <S.Header>
            <S.Today>2023.10.06</S.Today>
            <S.Buttons>
              <S.FullButton>일간</S.FullButton>
              <S.Button>주간</S.Button>
            </S.Buttons>
          </S.Header>
          <S.Graph>통계통계</S.Graph>
        </div>
        <S.PopularPostingsTable>
          <S.TableHeader>
            <S.TdTitle>
              <div>인기글</div>
            </S.TdTitle>
            <S.TdLeft></S.TdLeft>
            <S.TdCenter>월간 조회수</S.TdCenter>
            <S.TdCenter>행성</S.TdCenter>
            <S.TdCenter>작성일</S.TdCenter>
          </S.TableHeader>
          <S.Tablebody>
            <PopularPosting ranking={1} />
            <PopularPosting ranking={2} />
            <PopularPosting ranking={3} />
            <PopularPosting ranking={4} />
            <PopularPosting ranking={5} />
            <PopularPosting ranking={6} />
            <PopularPosting ranking={7} />
            <PopularPosting ranking={8} />
            <PopularPosting ranking={9} />
            <PopularPosting ranking={10} />
          </S.Tablebody>
        </S.PopularPostingsTable>
      </S.Statistics>
    </S.Container>
  );
}
