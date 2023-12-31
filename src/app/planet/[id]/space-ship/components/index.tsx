"use client";

import { createContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { isAxiosError } from "axios";
import axiosRequest from "@/api";
import { Planet, ResData } from "@/@types";
import { PlanetDataType, SPACESHIP_ROLE, SPACESHIP_STATUS } from "@/@types/Spaceship";
import { useModal } from "@/hooks/useModal";

import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import * as S from "./index.styled";

import Ship from "./Ship";
import { PLANET_ROLE_NAME, PlanetMembership } from "@/@types/Planet";
import SpaceshipTop from "./Top";
import SpaceshipBottom from "./Bottom";
import { CommonUserInfo } from "@/@types/User";

export interface SpaceShipType {
  id: number;
  name: string;
  image: string;
  description: string;
  maxMembers: number;
  memberCount: number;
  ownerId: number;
  status: SPACESHIP_STATUS;
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
  role: SPACESHIP_ROLE;
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

export default function SpaceshipPage() {
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

  const fetchSpaceshipData = async () => {
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
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const fetchPlanetData = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/${planetId}`, {});
      console.log(response);
      const { spaceshipLimit, name, memberLimit, ownerId } = response.data;
      setPlanetData({ spaceshipLimit, name, memberLimit, ownerId });
    } catch (error) {
      console.error("행성 조회 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const fetchMemberListData = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PlanetMembership[]>>(
        "get",
        `/planet/members/${planetId}`,
        {},
      );
      console.log(response);
      // 행성 관리자 제외한 멤버
      const member = response.data;
      const filteredMember = member.filter(m => m.role !== PLANET_ROLE_NAME.OWNER);
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
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

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
