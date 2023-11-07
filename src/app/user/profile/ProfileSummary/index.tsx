import axiosRequest from "@/api/index";
import { ResData, User } from "@/@types";

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

import * as S from "./index.styled";

import Image from "next/image";
import Line from "@/components/common/Line";
import FollowBtn from "@/app/mypage/friend/FollowBtn";

export default function ProfileSummary({ id }: { id: number }) {
  const [userProfile, setUserProfile] = useState<User>();
  const user = useRecoilValue(userAtom);

  //프로필 조회
  async function getUserProfile() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("get", `/user/other/${id}`);
      const profile = response.data;

      setUserProfile(profile);
      // console.log("profile", profile);
    } catch (error) {
      alert("프로필 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching profile data: ", error);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <S.Container>
      <S.UserInfo>
        <Image src="/assets/img/icons/default-user.svg" alt="user-img" width={120} height={120} />
        <S.Profile>
          <S.Nickname>{userProfile?.nickName}</S.Nickname>
          <S.Email>{userProfile?.email}</S.Email>
          {user?.id !== id && <FollowBtn userId={id} isMutual={userProfile?.isFollowing} updateData={getUserProfile} />}
        </S.Profile>
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
