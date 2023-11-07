import axiosRequest from "@/api/index";
import { ResData, User } from "@/@types";

import { useEffect, useState } from "react";

import * as S from "./index.styled";

import Image from "next/image";
import Line from "@/components/common/Line";
import Button from "@/components/common/Button";

export default function ProfileSummary({ id }: { id: number }) {
  const [userProfile, setUserProfile] = useState<User>();
  //프로필 조회
  async function getUserProfile() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("get", `/user/ohter/${id}`);
      const profile = response.data;

      setUserProfile(profile);
      console.log("profile", profile);
    } catch (error) {
      alert("프로필 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching profile data: ", error);
    }
  }
  useEffect(() => {
    getUserProfile();
  }, []);
  const handleClick = () => {
    console.log();
  };
  return (
    <S.Container>
      <S.UserInfo>
        <Image src="/assets/img/icons/default-user.svg" alt="user-img" width={120} height={120} />
        <div>
          <S.Nickname>{userProfile?.nickName}</S.Nickname>
          <S.Email>{userProfile?.email}</S.Email>
          <S.FollowBtn>
            <Button variant="confirm" shape="medium" size="smallWithXsFont" onClick={handleClick}>
              팔로우
            </Button>
          </S.FollowBtn>
        </div>
      </S.UserInfo>
      <S.Friends>
        <S.FollowerNumber>
          <S.Title>팔로워</S.Title>
          <S.Number>102</S.Number>
        </S.FollowerNumber>
        <Line color="gray" size="vertical" />
        <S.FollowingNumber>
          <S.Title>팔로잉</S.Title>
          <S.Number>2888</S.Number>
        </S.FollowingNumber>
      </S.Friends>
    </S.Container>
  );
}
