"use client";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import * as S from "./page.styled";

import Divider from "@/app/my-page/Divider";
import PopularPosting from "./PopularPosting";
import DropDown from "./DropDown";

export default function Statistics() {
  return (
    <S.Container>
      <S.SummaryWrap>
        <S.SelectedPlanet>
          <S.Planet>
            <Image src="/assets/img/icons/planet-0.svg" alt="planet" width={30} height={30} />
            <span>일본 맛도리 여행</span>
          </S.Planet>
          <DropDown />
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
