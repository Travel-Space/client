"use client";
import axiosRequest from "@/api";
import { ResData, Planet, Planets } from "@/@types";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import planetsState from "@/recoil/atoms/planets.atom";
import { selectedDateState } from "@/recoil/atoms/chart.atom";

import * as S from "./page.styled";

import PopularPosting from "./PopularPosting";
import Button from "@/components/common/Button";
import Summary from "./Summary";
import Chart from "./Chart";

export default function Statistics() {
  const [planets, setPlanets] = useRecoilState(planetsState);
  const selectedDate = useRecoilValue(selectedDateState);

  const [selectedPlanet, setSelectedPlanet] = useState<Planet>();

  const [dropdownMenu, setDropdownMenu] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState(dropdownMenu[0]);

  const dropDownProps = {
    comment: "행성 선택",
    menuList: dropdownMenu,
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: (menu: string) => setSelectedMenu(menu), //메뉴를 클릭했을 때 실행될 메서드
  };

  const [isActive, setIsActive] = useState<"daily" | "weekly">("daily");

  const handleClickDailyBtn = () => {
    setIsActive("daily");
  };
  const handleClickWeeklyBtn = () => {
    setIsActive("weekly");
  };

  //내 행성 불러오기
  //api 수정되면 수정예정
  async function getMyPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planets>>("get", "/planet/my-planets");
      setPlanets(response.data.data);
      // console.log("planets", response.data.data);
    } catch (error) {
      alert("행성 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet data: ", error);
    }
  }

  useEffect(() => {
    getMyPlanets();
  }, []);

  useEffect(() => {
    const planetNames = planets.map(planet => planet.name);
    setDropdownMenu([...planetNames]);
    // console.log("planetNames", planetNames);
    // console.log("dropdownMenu", dropdownMenu);
  }, [planets]);

  useEffect(() => {
    const planet = planets?.filter(planet => planet.name === selectedMenu)[0];
    setSelectedPlanet(planet);
    // console.log("selectedPlanet", selectedPlanet);
  }, [selectedMenu]);

  return (
    <S.Container>
      <Summary selectedPlanet={selectedPlanet} selectedMenu={selectedMenu} dropDownProps={dropDownProps} />

      <S.Statistics>
        <div>
          <S.Header>
            <S.Today>{selectedDate}</S.Today>
            <S.Buttons isActive={isActive}>
              <Button variant="reverse" shape="medium" size="smallWithSmFont" onClick={handleClickDailyBtn}>
                일간
              </Button>
              <Button variant="reverse" shape="medium" size="smallWithSmFont" onClick={handleClickWeeklyBtn}>
                주간
              </Button>
            </S.Buttons>
          </S.Header>
          <Chart />
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
