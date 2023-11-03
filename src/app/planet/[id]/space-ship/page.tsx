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
import PlanetMember from "./Modal/PlanetMember";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import { PlanetMembership } from "@/@types/Planet";

export default function SpaceShip() {
  const [spaceShipList, setSpaceShipList] = useState<Spaceship>();
  const [spaceShipLimit, setSpaceShipLimit] = useState<number>(0);
  const [planetName, setPlanetName] = useState<string>();
  const [planetMember, setPlanetMember] = useState<PlanetMembership[]>();

  const { modalDataState, openModal, closeModal } = useModal();

  const router = useRouter();
  const params = useParams();
  const { memberships } = useRecoilValue(userAtom);
  const { planets } = memberships;
  const id: string = params.id as string;
  const thisPlanet = planets.find(planet => planet?.planetId === parseInt(id));

  const exitModal = {
    title: "행성 탈출",
    // 현재 내 user recoil 행성별 role 정보에 맞게 보여줘야 함
    content: (
      <Exit
        onClose={closeModal}
        title={planetName}
        type={ItemType.Planet}
        role={thisPlanet?.role}
        id={id}
        members={planetMember}
      />
    ),
  };

  const planetMemberModal = {
    title: "행성 멤버 관리",
    content: <PlanetMember onClose={closeModal} />,
  };

  const limitNumber = Array.from({ length: spaceShipLimit }, (_, index) => index + 1);

  async function fetchPlanetData() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/${id}`, {});
      console.log(response);
      setSpaceShipLimit(response.data.spaceshipLimit);
      setPlanetName(response.data.name);
    } catch (error) {
      console.error("우주선 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  async function fetchMemberListData() {
    try {
      const response = await axiosRequest.requestAxios<ResData<PlanetMembership[]>>("get", `/planet/members/${id}`, {});
      console.log(response);
      // 행성 관리자 제외한 멤버
      const member = response.data;
      const filteredMember = member.filter(m => m.role !== "OWNER");
      setPlanetMember(filteredMember);
    } catch (error) {
      console.error("멤버 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    fetchPlanetData();
    fetchMemberListData();
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
        {/* 현재 내 user recoil 행성별 role이 OWNER일 경우 관리버튼 노출 */}
        <S.MemberBtn>
          <Button variant="gradient" shape="large" size="big" onClick={() => openModal(planetMemberModal)}>
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
