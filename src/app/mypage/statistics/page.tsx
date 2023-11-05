"use client";
import axiosRequest from "@/api";
import { ResData, Planet, Planets } from "@/@types";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import planetsState from "@/recoil/atoms/planets.atom";
import { selectedDateState, selectedWeekState } from "@/recoil/atoms/chart.atom";

import * as S from "./page.styled";

import PopularPost from "./PopularPost";
import Button from "@/components/common/Button";
import Summary from "./Summary";
import DailyViewChart from "./DailyViewChart";
import WeeklyViewChart from "./WeeklyViewChart";
import Nothing from "@/components/common/Nothing";

export default function Statistics() {
  const [planets, setPlanets] = useRecoilState(planetsState);
  const selectedDate = useRecoilValue(selectedDateState);
  const selectedWeek = useRecoilValue(selectedWeekState); //bar 클릭 시 선택된 주

  const [selectedPlanet, setSelectedPlanet] = useState<Planet>();

  const [dropdownMenu, setDropdownMenu] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState(dropdownMenu[0]);

  const dropDownProps = {
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
  async function getMyPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planets>>(
        "get",
        "/planet/my-owned-planets?page=1&limit=5",
      );
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
    setSelectedMenu(planetNames[0]);
    setSelectedPlanet(planets[0]);
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
      {!selectedPlanet ? (
        <Nothing
          src="/assets/img/icons/no-planets.svg"
          alt="no-TravelingPlanets"
          width={148}
          height={148}
          comment="소유하는 행성이 없습니다."
          font="lg"
        />
      ) : (
        <>
          <Summary selectedPlanet={selectedPlanet} selectedMenu={selectedMenu} dropDownProps={dropDownProps} />
          <S.Statistics>
            <div>
              <S.Header>
                <S.Today>{isActive === "daily" ? selectedDate : selectedWeek}</S.Today>
                <S.Buttons isActive={isActive}>
                  <Button variant="reverse" shape="medium" size="smallWithSmFont" onClick={handleClickDailyBtn}>
                    일간
                  </Button>
                  <Button variant="reverse" shape="medium" size="smallWithSmFont" onClick={handleClickWeeklyBtn}>
                    주간
                  </Button>
                </S.Buttons>
              </S.Header>
              <S.Graph>
                {isActive === "daily" ? (
                  <DailyViewChart planetId={selectedPlanet.id} />
                ) : (
                  <WeeklyViewChart planetId={selectedPlanet.id} />
                )}
              </S.Graph>
            </div>
            <PopularPost />
          </S.Statistics>
        </>
      )}
    </S.Container>
  );
}
