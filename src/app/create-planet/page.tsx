"use client";

import { useState } from "react";

import * as S from "./page.styled";

import Title from "./Title";
import DeletePlanetModal from "./Modal/DeletePlanetModal";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";
import Input from "@/components/common/Input";

const planets = [
  { value: "planet-1", src: "/assets/img/icons/planet-1.svg" },
  { value: "planet-2", src: "/assets/img/icons/planet-1.svg" },
  { value: "planet-3", src: "/assets/img/icons/planet-1.svg" },
  { value: "planet-4", src: "/assets/img/icons/planet-1.svg" },
];

export default function CreatePlanet() {
  const [showDeletePlanetModal, setShowDeletePlanetModal] = useState<boolean>(false);

  return (
    // 컴포넌트 정리 예정
    <S.Wrap>
      <S.Container className="left">
        <S.Center>
          <S.ArrowLeft type="button">이전</S.ArrowLeft>
          <img src="/assets/img/icons/planet-1.svg" />
          {/* 행성 이미지 목록은 select로 구현 예정 */}
          <S.ArrowRight type="button">다음</S.ArrowRight>
        </S.Center>
        <S.PlanetTitle>일본 맛도리 여행</S.PlanetTitle>
        {/* <S.TagGroup>
          <Input type="text" placeholder="주제 해시태그 최대 5개" />
          <ul>
            <li>
              <span>일본 여행</span>
              <button>삭제</button>
            </li>
            <li>
              <span>일본 여행</span>
              <button>삭제</button>
            </li>
            <li>
              <span>일본 여행</span>
              <button>삭제</button>
            </li>
            <li>
              <span>일본 여행</span>
              <button>삭제</button>
            </li>
            <li>
              <span>일본 여행</span>
              <button>삭제</button>
            </li>
          </ul>
        </S.TagGroup> */}
        {/* <LinkButton disabled>탑승 우주선으로 이동</LinkButton> */}
        {/* 행성 관리자만 삭제 가능 */}
        <S.DeletePlanetBtn type="button" onClick={() => setShowDeletePlanetModal(true)}>
          행성 삭제 💥
        </S.DeletePlanetBtn>
      </S.Container>
      <S.Container className="right">
        <Title />
        {/* <S.InputGroup>
          <Label htmlFor="planet-title">행성 이름</Label>
          <Input type="text" id="planet-title" />
        </S.InputGroup>
        <S.InputGroup>
          <Label htmlFor="planet-description">행성 소개</Label>
          <TextArea id="planet-description" $height="224px" />
        </S.InputGroup> */}
        <S.Center>
          {/* <S.AdjustBtnGroup>
            <AdjustBtnInput label="탑승 인원수" />
          </S.AdjustBtnGroup>
          <S.AdjustBtnGroup>
            <AdjustBtnInput label="우주선 갯수" />
          </S.AdjustBtnGroup> */}
        </S.Center>
        {/* <Line /> */}
        <S.Center>
          {/* <OutlineButton type="button">취소</OutlineButton> */}
          {/* <FillButton type="submit">작성완료</FillButton> */}
        </S.Center>
      </S.Container>
      {showDeletePlanetModal ? (
        <DeletePlanetModal onClose={() => setShowDeletePlanetModal(false)} planetTitle="일본 맛도리 여행" />
      ) : null}
    </S.Wrap>
  );
}
