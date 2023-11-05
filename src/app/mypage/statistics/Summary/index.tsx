import { Menu } from "@/@types/DropDown";
import { Planet } from "@/@types";

import { todayViewCountState } from "@/recoil/atoms/planets.atom";

import * as S from "./index.styled";

import Image from "next/image";
import Line from "@/components/common/Line";
import DropDown from "@/components/common/DropDown";

import PLANETSHAPE from "@/constants/planetShape";
import { useRecoilValue } from "recoil";

interface SummaryProps {
  selectedPlanet?: Planet;
  selectedMenu: string;
  dropDownProps: Menu;
}
const Summary = ({ selectedPlanet, selectedMenu, dropDownProps }: SummaryProps) => {
  const { shape, articles } = selectedPlanet as Planet;

  const todayViewCount = useRecoilValue(todayViewCountState);

  return (
    <S.SummaryWrap>
      <S.SelectedPlanet>
        <S.Planet>
          <Image src={PLANETSHAPE[shape]} alt="planet" width={30} height={30} />
          <span>{selectedMenu}</span>
        </S.Planet>
        <S.DropDownWrap>
          <DropDown font="md" shape="round" color="gray" props={dropDownProps} />
        </S.DropDownWrap>
      </S.SelectedPlanet>
      <S.Summary>
        <div>
          <S.SummaryTitle>오늘 방문 수</S.SummaryTitle>
          <S.Number>{todayViewCount}</S.Number>
        </div>
        <Line color="gray" size="vertical" />
        <div>
          <S.SummaryTitle>누적 방문 수</S.SummaryTitle>
          <S.Number>100</S.Number>
        </div>
        <Line color="gray" size="vertical" />
        <div>
          <S.SummaryTitle>게시글 수</S.SummaryTitle>
          <S.Number>{articles.length}</S.Number>
        </div>
      </S.Summary>
    </S.SummaryWrap>
  );
};
export default Summary;
