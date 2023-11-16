"use client";
import axiosRequest from "@/api";
import { ResData, Planet, PlanetsType } from "@/@types";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { myPlanetsState } from "@/recoil/atoms/planets.atom";
import { selectedDateState, selectedWeekState } from "@/recoil/atoms/chart.atom";

import * as S from "./page.styled";

import PopularPost from "./PopularPost";
import Button from "@/components/common/Button";
import Summary from "./Summary";
import Nothing from "@/components/common/Nothing";

import dynamic from "next/dynamic";

const DailyViewChart = dynamic(() => import("./DailyViewChart"), { ssr: false });
const WeeklyViewChart = dynamic(() => import("./WeeklyViewChart"), { ssr: false });

export default function Statistics() {
  const [myPlanets, setMyPlanets] = useRecoilState(myPlanetsState);
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
      const response = await axiosRequest.requestAxios<ResData<PlanetsType>>(
        "get",
        "/planet/my-owned-planets?page=1&limit=5",
      );
      setMyPlanets(response.data.data);
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
    const planetNames = myPlanets.map(planet => planet.name);
    setDropdownMenu([...planetNames]);
    setSelectedMenu(planetNames[0]);
    setSelectedPlanet(myPlanets[0]);
    // console.log("planetNames", planetNames);
    // console.log("dropdownMenu", dropdownMenu);
  }, [myPlanets]);

  useEffect(() => {
    const planet = myPlanets?.filter(planet => planet.name === selectedMenu)[0];
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
            <PopularPost planetId={selectedPlanet.id} />
          </S.Statistics>
        </>
      )}
    </S.Container>
  );
}
