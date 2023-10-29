"use client";

import Ship from "./Ship";
import * as S from "./page.styled";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// Import Swiper React components
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import axiosRequest from "@/api";
import { AxiosError } from "axios";
import { Planet, ResData } from "@/@types";
import { Spaceship } from "@/@types/Spaceship";

export default function SpaceShip() {
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showMemberModal, setShowMemberModal] = useState<boolean>(false);

  const [spaceShipList, setSpaceShipList] = useState<Spaceship>();
  const [spaceShipLimit, setSpaceShipLimit] = useState<number>(0);
  const [planetName, setPlanetName] = useState<string>();

  const router = useRouter();
  const params = useParams();

  const limitNumber = Array.from({ length: spaceShipLimit }, (_, index) => index + 1);

  async function fetchPlanetData() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/${params.id}`, {});
      console.log(response);
      setSpaceShipLimit(response.data.spaceshipLimit);
      setPlanetName(response.data.name);
    } catch (error) {
      console.error("우주선 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    fetchPlanetData();
  }, []);

  return (
    <S.Wrap>
      <S.Header>
        <Button variant="basic" size="normal" shape="large" onClick={() => router.back()}>
          <img src="/assets/img/icons/prev-white.svg" height={16} />
        </Button>
        <S.Title>{planetName}</S.Title>
        <Button variant="basic" size="normal" shape="large">
          <S.CenterGroup>
            <span>탑승링크</span>
            <img src="/assets/img/icons/share-white.svg" height={16} />
          </S.CenterGroup>
        </Button>
      </S.Header>

      <S.List
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={24}
        grabCursor={false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {limitNumber.map(ship => (
          <SwiperSlide key={ship}>
            <Ship test={ship} />
          </SwiperSlide>
        ))}
      </S.List>

      <S.Footer>
        <S.MemberBtn>
          <Button variant="gradient" shape="large" size="big" onClick={() => setShowMemberModal(true)}>
            <S.CenterGroup>
              <img src="/assets/img/icons/users.svg" />
              <span>행성 멤버 관리</span>
            </S.CenterGroup>
          </Button>
        </S.MemberBtn>
        <S.ExitBtn onClick={() => setShowExitModal(true)}>우주선 탈출 💥</S.ExitBtn>
      </S.Footer>
    </S.Wrap>
  );
}
