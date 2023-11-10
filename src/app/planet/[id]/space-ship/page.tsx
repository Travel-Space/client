"use client";

import { createContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import axiosRequest from "@/api";
import { Planet, ResData } from "@/@types";
import { Role, SpaceshipStatus } from "@/@types/Spaceship";
import { useModal } from "@/hooks/useModal";

import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import * as S from "./page.styled";

import Ship from "./Ship";
import { PlanetMembership } from "@/@types/Planet";
import SpaceshipTop from "./Top";
import SpaceshipBottom from "./Bottom";
import { CommonUserInfo } from "@/@types/User";

export interface SpaceShipType {
  id: number;
  name: string;
  image: string;
  description: string;
  maxMembers: number;
  ownerId: number;
  status: SpaceshipStatus;
  startDate: string;
  endDate: string;
  planetId: number;
  chatRoomId: number;
  createdAt: string;
  updatedAt: string;
  members: SpaceShipMembers[];
}

export interface SpaceShipMembers {
  id: number;
  email: string;
  nickName: string;
  profileImage: string;
  userId: number;
  role: Role;
}

export interface PlanetDataType {
  name: string;
  memberLimit: number;
  spaceshipLimit: number;
  ownerId: number;
}

export interface SpaceshipContextType {
  planetData: PlanetDataType;
  planetId: string;
  planetMember: CommonUserInfo[];
  fetchMemberListData: () => void;
  fetchSpaceshipData: () => void;
}

export const SpaceshipContext = createContext<SpaceshipContextType>({
  planetData: {
    name: "",
    memberLimit: 0,
    spaceshipLimit: 0,
    ownerId: 0,
  },
  planetId: "",
  planetMember: [],
  fetchMemberListData: () => {},
  fetchSpaceshipData: () => {},
});

export default function SpaceShip() {
  const [spaceshipList, setSpaceshipList] = useState<SpaceShipType[]>([]);
  const [planetMember, setPlanetMember] = useState<CommonUserInfo[]>([]);
  const [planetData, setPlanetData] = useState<PlanetDataType>({
    name: "",
    memberLimit: 0,
    spaceshipLimit: 0,
    ownerId: 0,
  });

  const { modalDataState } = useModal();

  const params = useParams();

  const planetId: string = params.id as string;

  const limitNumber = Array.from({ length: planetData.spaceshipLimit }, (_, index) => index + 1);
  const remainingSpaceships = [...spaceshipList, ...limitNumber?.slice(spaceshipList.length)];

  async function fetchSpaceshipData() {
    try {
      const response = await axiosRequest.requestAxios<ResData<SpaceShipType[]>>(
        "get",
        `/spaceship/by-planet/${planetId}`,
        {},
      );
      console.log(response);
      response.data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setSpaceshipList(response.data);
    } catch (error) {
      console.error("우주선 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  async function fetchPlanetData() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/${planetId}`, {});
      console.log(response);
      const { spaceshipLimit, name, memberLimit, ownerId } = response.data;
      setPlanetData({ spaceshipLimit, name, memberLimit, ownerId });
    } catch (error) {
      console.error("행성 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  async function fetchMemberListData() {
    try {
      const response = await axiosRequest.requestAxios<ResData<PlanetMembership[]>>(
        "get",
        `/planet/members/${planetId}`,
        {},
      );
      console.log(response);
      // 행성 관리자 제외한 멤버
      const member = response.data;
      const filteredMember = member.filter(m => m.role !== "OWNER");
      const resultMember = filteredMember.map(
        (member: PlanetMembership): CommonUserInfo => ({
          email: member.user.email,
          nickName: member.user.nickName,
          profileImage: member.user.profileImage,
          role: member.role,
          userId: member.user.id,
          invited: member.user.invited,
        }),
      );
      setPlanetMember(resultMember);
    } catch (error) {
      console.error("멤버 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    fetchPlanetData();
    fetchSpaceshipData();
    fetchMemberListData();
  }, []);

  return (
    <SpaceshipContext.Provider value={{ planetData, planetId, planetMember, fetchMemberListData, fetchSpaceshipData }}>
      {modalDataState.isOpen && modalDataState.content}
      <S.Wrap>
        <SpaceshipTop />
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
          {remainingSpaceships?.map((ship, index) => (
            <SwiperSlide key={index}>
              <Ship ship={ship} />
            </SwiperSlide>
          ))}
        </S.List>
        <SpaceshipBottom />
      </S.Wrap>
    </SpaceshipContext.Provider>
  );
}
