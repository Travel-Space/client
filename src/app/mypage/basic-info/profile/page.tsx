"use client";
import axiosRequest from "@/api/index";
import { ResData, User } from "@/@types/index";
import { CountryInfo } from "@/@types/User";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "@/recoil/atoms/user.atom";

import * as S from "./page.styled";

import Link from "next/link";
import Line from "@/components/common/Line";
import Button from "@/components/common/Button";
import ProfileImage from "./ProfileImage";
import Item from "./Item";
import NicknameInput from "./Nickname";
import SearchCountry from "@/components/common/SearchCountry";
import Password from "./Password";

import VALIDATE from "@/constants/regex";

export default function Profile() {
  const [profile, setProfile] = useRecoilState(profileState);

  const [showSearch, setShowSearch] = useState(false);

  const [changedNickname, setChangedNickname] = useState(profile?.nickName || "");
  const [isAvailableNickname, setIsAvailableNickname] = useState(true);

  const [changedProfileImg, setChangedProfileImg] = useState(profile?.profileImage);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [isPasswordMatching, setIsPasswordMatching] = useState(false);

  const [country, setCountry] = useState<CountryInfo>({
    country_nm: profile?.nationality || "",
    country_eng_nm: "",
    download_url: "",
  });

  const [notAllowSave, setNotAllowSave] = useState(true);
  const [notAllowChange, setNotAllowChange] = useState(true);

  //프로필이미지 변경
  const handleChangeImg = (src: string) => {
    setChangedProfileImg(src);
  };
  //닉네임 변경
  const handleChangeNickname = (nickname: string) => {
    setChangedNickname(nickname);
  };
  //비밀번호 일치 여부 확인
  function handlePasswordCompare(result: boolean, value: string) {
    setIsPasswordMatching(result);
    setPassword(value);
    VALIDATE.password.test(value) ? setPasswordValid(true) : setPasswordValid(false);
  }
  //국적 변경
  function handleCountry(country: CountryInfo) {
    setCountry(country);
  }

  //중복확인 체크
  useEffect(() => {
    if (!!isAvailableNickname) {
      setNotAllowSave(false);
      return;
    }
    setNotAllowSave(true);
  }, [changedNickname, isAvailableNickname]);

  //비밀번호 체크
  useEffect(() => {
    if (passwordValid && isPasswordMatching) {
      setNotAllowChange(false);
      return;
    }
    setNotAllowChange(true);
  }, [passwordValid, isPasswordMatching]);

  //프로필 조회 api
  async function getProfile() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("get", "/user/profile");
      setProfile(response.data);
      // console.log("profile", profile);
    } catch (error) {
      alert("프로필 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching profile data: ", error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  //회원정보 수정 api
  interface updateProfileProps {
    nickName?: string;
    nationality?: string;
    profileImage?: string;
  }
  //비밀번호 추가 후 수정예정
  const updateProfile = async (data: updateProfileProps) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("put", "/auth/update", data);
      // console.log(response.status);
      if (response.status === 200) {
        getProfile();
        alert("프로필이 변경되었습니다.");
        return;
      }
    } catch (error) {
      alert("프로필 정보를 수정하는 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error updating profile data: ", error);
    }
  };

  //변경사항 저장
  const saveData = () => {
    const changedData = {
      nickName: changedNickname,
      nationality: country.country_nm,
      profileImage: changedProfileImg,
      password: password === "" ? null : password,
    };
    //비밀번호 추가 후 수정예정
    console.log(changedData);
    // updateProfile(changedData);
  };

  return (
    <S.Container>
      <S.Title>프로필 편집</S.Title>
      <S.Main>
        <Item name="프로필 사진">
          {/* 기본이미지 픽스 후 수정예정 */}
          <ProfileImage prev={"/assets/img/icons/default-user.svg"} onChange={handleChangeImg} />
        </Item>
        <Line color="gray" size="horizontal" />
        <Item name="이름">
          <S.Input type="text" value={profile?.name} readOnly />
        </Item>
        <Line color="gray" size="horizontal" />
        <Item name="이메일">
          <S.Input type="text" value={profile?.email} readOnly />
        </Item>
        <Line color="gray" size="horizontal" />
        <Item name="닉네임">
          <NicknameInput
            nickname={changedNickname}
            onChange={handleChangeNickname}
            isAvailableNickname={isAvailableNickname}
            setIsAvailableNickname={(value: boolean) => setIsAvailableNickname(value)}
          />
        </Item>
        <Line color="gray" size="horizontal" />
        <Item name="국적">
          <S.Nationality>
            <S.Input type="text" value={country.country_nm} onClick={() => setShowSearch(true)} />
            {showSearch && <SearchCountry onCountry={handleCountry} onClose={() => setShowSearch(false)} />}
          </S.Nationality>
        </Item>
      </S.Main>
      <S.ButtonWrap>
        <Button variant="confirm" shape="medium" size="big" onClick={saveData} disabled={notAllowSave}>
          변경 사항 저장
        </Button>
      </S.ButtonWrap>
      <S.Title>비밀번호 변경</S.Title>
      <S.Main>
        <Item name="비밀번호">
          <Password onPasswordCompare={handlePasswordCompare} valid={!passwordValid && password.length > 0} />
        </Item>
      </S.Main>

      <S.Footer>
        <S.Leave>
          <div>* 더 이상 Travel Space 이용을 원하지 않는다면 </div>
          <Link href="/user/leave">회원탈퇴</Link>
        </S.Leave>
        <S.Save>
          <Button variant="confirm" shape="medium" size="big" onClick={saveData} disabled={notAllowChange}>
            비밀번호 변경하기
          </Button>
        </S.Save>
      </S.Footer>
    </S.Container>
  );
}
