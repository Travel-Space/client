"use client";
import axiosRequest from "@/api/index";
import { ResData, User } from "@/@types/index";

import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "@/recoil/atoms/user.atom";

import * as S from "./page.styled";

import Link from "next/link";
import Line from "@/components/common/Line";
import Button from "@/components/common/Button";
import ProfileImage from "./ProfileImage";
import Item from "./Item";

export default function Profile() {
  const [profile, setProfile] = useRecoilState(profileState);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const nationalityInputRef = useRef<HTMLInputElement>(null);

  //프로필 불러오기
  async function getProfile() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("get", "/user/profile");
      setProfile(response.data);
      console.log("profile", profile);
    } catch (error) {
      alert("프로필 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching profile data: ", error);
    }
  }
  useEffect(() => {
    if (profile === null) getProfile();
  }, []);

  //프로필이미지 변경
  const [changedProfileImg, setChangedProfileImg] = useState(profile?.profileImage);
  const handleChangeImg = (src: string) => {
    setChangedProfileImg(src);
  };

  //닉네임 변경
  const NicknameInput = ({ prev }: { prev?: string }) => {
    const [nickname, setNickname] = useState(prev);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    };
    return <S.NicknameInput type="text" ref={nicknameInputRef} value={nickname} onChange={handleChange} />;
  };

  //국적
  // 슬언니꺼 완료되면 가져오기-수정예정
  const NationalityInput = ({ prev }: { prev?: string }) => {
    const [nationality, setNationality] = useState(profile?.nationality);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNationality(e.target.value);
    };
    return <S.NicknameInput type="text" ref={nationalityInputRef} value={nationality} onChange={handleChange} />;
  };

  //변경사항 저장
  interface updateProfileProps {
    nickName?: string;
    nationality?: string;
    profileImage?: string;
  }
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
  const saveData = () => {
    const changedData = {
      nickName: nicknameInputRef.current?.value,
      nationality: nationalityInputRef.current?.value,
      profileImage: changedProfileImg,
    };
    // console.log(changedData);
    updateProfile(changedData);
  };

  return (
    <S.Container>
      <S.Main>
        <Item name="프로필 사진">
          {/* 기본이미지 픽스 후 수정예정 */}
          <ProfileImage prev={profile?.profileImage} onChange={handleChangeImg} />
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
          <NicknameInput prev={profile?.nickName} />
          {/* 중복확인 api 완료 후 수정예정 */}
          <S.DoubleCheck>중복확인</S.DoubleCheck>
        </Item>
        <Line color="gray" size="horizontal" />
        <Item name="국적">
          {/* 슬언니꺼 완료되면 가져오기-수정예정 */}
          <NationalityInput prev={profile?.nationality} />
        </Item>
      </S.Main>
      <S.Footer>
        <S.Leave>
          <div>* 더 이상 Travel Space 이용을 원하지 않는다면 </div>
          <Link href="/user/leave">회원탈퇴</Link>
        </S.Leave>
        <S.Save>
          <Button variant="confirm" shape="medium" size="big" onClick={saveData}>
            변경 사항 저장
          </Button>
        </S.Save>
      </S.Footer>
    </S.Container>
  );
}
