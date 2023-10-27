"use client";
import { useState, useEffect } from "react";
import axiosRequest from "@/api/index";
import { ResData, User } from "@/@types/index";

import Link from "next/link";
import * as S from "./page.styled";

import Line from "@/components/common/Line";
import ProfileImage from "./ProfileImage";
import Item from "./Item";

export default function Profile() {
  const [profile, setProfile] = useState<User>();

  //내 프로필 조회
  async function getProfile() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("get", "/user/profile");
      const profile = response.data;
      setProfile(profile);
      // console.log("response.data", profile);
    } catch (error) {
      alert("프로필 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching profile data: ", error);
    }
  }
  useEffect(() => {
    getProfile();
    console.log("profile", profile);
  }, []);

  //프로필이미지 변경
  const [changedProfileImg, setChangedProfileImg] = useState<string | null>(profile?.profileImage || null);
  const handleChangeImg = (src: string) => {
    setChangedProfileImg(src);
  };

  //닉네임 변경
  const NicknameInput = ({ prev }: { prev?: string }) => {
    const [nickname, setNickname] = useState(prev);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    };
    return <S.NicknameInput type="text" value={nickname} onChange={handleChange} />;
  };

  //국적
  const [nationality, setNationality] = useState(profile?.nationality);

  // //변경사항 저장
  // interface updateProfileProps {
  //   nickName: string;
  //   nationality: string;
  //   profileImage: string;
  // }
  // const updateProfile = async (data: updateProfileProps) => {
  //   return await axios.put(`/auth/update`, data);
  // };
  // const { mutate: updateProfileMutation } = useMutation({
  //   mutationFn: updateProfile,
  // });

  // const handleClick = (updatedData: updateProfileProps) => {
  //   updateProfileMutation(updatedData);
  // };
  return (
    <S.Container>
      <S.Main>
        <Item name="프로필 사진">
          {/* 기본이미지 픽스 후 수정예정 */}
          <ProfileImage prev={changedProfileImg} onChange={handleChangeImg} />
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
          <div>{nationality}</div>
        </Item>
      </S.Main>
      <S.Footer>
        <S.Leave>
          <div>* 더 이상 Travel Space 이용을 원하지 않는다면 </div>
          <Link href="/user/leave">회원탈퇴</Link>
        </S.Leave>
        <S.Save>
          {/* <Button
            variant="confirm"
            shape="medium"
            size="big"
            onClick={() => handleClick({ nickName: nickname, nationality: nationality, profileImage: profileImage })}
          >
            변경 사항 저장
          </Button> */}
        </S.Save>
      </S.Footer>
    </S.Container>
  );
}
