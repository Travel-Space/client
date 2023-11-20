import axiosRequest from "@/api";
import { ResData, User } from "@/@types";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "@/recoil/atoms/user.atom";

import * as S from "./index.styled";

import MESSAGE from "@/constants/message";

export default function Profile() {
  const [profile, setProfile] = useRecoilState(profileState);

  const router = useRouter();

  const goToProfile = () => {
    router.push(`/user/profile/${profile?.id}`);
  };

  const getProfile = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("get", `/user/profile`);
      setProfile(response.data);
      // console.log("profile", response.data);
    } catch (error) {
      console.error("팔로워 정보를 불러오는 중 오류가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <S.Container>
      <S.UserImg src={profile?.profileImage} alt="profile-image" onClick={goToProfile} />
      <S.Nickname>{profile?.nickName}</S.Nickname>
      <S.Email>{profile?.email}</S.Email>
    </S.Container>
  );
}
