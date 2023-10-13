"use client";

import { useState } from "react";

import * as S from "./page.style";
import {
  Label,
  Input,
  TextArea,
  Line,
  FillButton,
  OutlineButton,
  AdjustButtons,
  MinusButton,
  PlusButton,
  NumberText,
  LinkButton,
} from "../account/common.styled";
import Title from "./Title";

const planets = [
  { value: "planet-1", src: "/assets/img/icons/planet-1.svg" },
  { value: "planet-2", src: "/assets/img/icons/planet-1.svg" },
  { value: "planet-3", src: "/assets/img/icons/planet-1.svg" },
  { value: "planet-4", src: "/assets/img/icons/planet-1.svg" },
];

export default function CreatePlanet() {
  return (
    <S.Form>
      <S.Box className="left">
        <S.Center>
          <S.ArrowLeft type="button">이전</S.ArrowLeft>
          <img src="/assets/img/icons/planet-1.svg" />
          {/* 행성 이미지 목록은 select로 구현 예정 */}
          <S.ArrowRight type="button">다음</S.ArrowRight>
        </S.Center>
        <p>일본 맛도리 여행</p>
        <S.FormGroup>
          <Input type="text" placeholder="주제 해시태그 최대 5개" />
        </S.FormGroup>
        <LinkButton disabled>탑승 우주선으로 이동</LinkButton>
      </S.Box>
      <S.Box className="right">
        <Title />
        <S.FormGroup>
          <Label htmlFor="planet-title">행성 이름</Label>
          <Input type="text" id="planet-title" />
        </S.FormGroup>
        <S.FormGroup>
          <Label htmlFor="planet-description">행성 소개</Label>
          <TextArea id="planet-description" />
        </S.FormGroup>
        <S.Center>
          <S.AdjustBtnGroup>
            <Label>탑승 인원수</Label>
            <AdjustButtons>
              <MinusButton type="button">-</MinusButton>
              <NumberText>100</NumberText>
              <PlusButton type="button">+</PlusButton>
            </AdjustButtons>
          </S.AdjustBtnGroup>
          <S.AdjustBtnGroup>
            <Label>우주선 갯수</Label>
            <AdjustButtons>
              <MinusButton type="button">-</MinusButton>
              <NumberText>15</NumberText>
              <PlusButton type="button">+</PlusButton>
            </AdjustButtons>
          </S.AdjustBtnGroup>
        </S.Center>
        <Line />
        <S.Center>
          <OutlineButton type="button">취소</OutlineButton>
          <FillButton type="submit">작성완료</FillButton>
        </S.Center>
      </S.Box>
    </S.Form>
  );
}
