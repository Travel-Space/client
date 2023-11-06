"use client";
import axiosRequest from "@/api";
import { ResData, User } from "@/@types";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "@/recoil/atoms/user.atom";

import * as S from "./index.styled";

import NavList from "./NavList";
import Profile from "@/app/mypage/Nav/Profile";

interface Menu {
  name: string;
  href: string;
}
interface NavData {
  logo: JSX.Element;
  parentMenu: Menu;
  subMenu: Menu[];
}
interface NavProps {
  navData: NavData[];
}

export default function Nav({ navData }: NavProps) {
  const [profile, setProfile] = useRecoilState(profileState);
  const { profileImage, nickName, email } = profile as User;

  async function getProfile() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("get", `/user/profile`);
      setProfile(response.data);
      // console.log("profile", response.data);
    } catch (error) {
      alert("팔로워 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followers data: ", error);
    }
  }
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <S.Container>
      <Profile imgSrc={profileImage} nickname={nickName} email={email} />
      {navData.map((el, idx) => (
        <NavList key={idx} logo={el.logo} parent={el.parentMenu} sub={el.subMenu} />
      ))}
    </S.Container>
  );
}
