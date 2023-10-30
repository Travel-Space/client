"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AxiosError } from "axios";
import axiosRequest from "@/api";
import { Planet, ResData } from "@/@types";
import { Spaceship } from "@/@types/Spaceship";
import { useModal } from "@/hooks/useModal";

import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Exit from "@/components/SpaceModal/Exit";
import Button from "@/components/common/Button";
import Ship from "./Ship";

import * as S from "./page.styled";
import { ItemType } from "@/@types/Modal";

export default function SpaceShip() {
  const [spaceShipList, setSpaceShipList] = useState<Spaceship>();
  const [spaceShipLimit, setSpaceShipLimit] = useState<number>(0);
  const [planetName, setPlanetName] = useState<string>();
  const { modalDataState, openModal, closeModal } = useModal();

  const exitModal = {
    title: "행성 탈출",
    // 현재 내 user recoil 행성별 role 정보에 맞게 보여줘야 함
    content: <Exit onClose={closeModal} title={planetName} type={ItemType.Planet} role={"OWNER"} />,
  };

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
      {modalDataState.isOpen && modalDataState.content}
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
          <Button variant="gradient" shape="large" size="big">
            <S.CenterGroup>
              <img src="/assets/img/icons/users.svg" />
              <span>행성 멤버 관리</span>
            </S.CenterGroup>
          </Button>
        </S.MemberBtn>
        <S.ExitBtn onClick={() => openModal(exitModal)}>행성 탈출 💥</S.ExitBtn>
      </S.Footer>
    </S.Wrap>
  );
}
