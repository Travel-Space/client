"use client";
import { useState, useEffect } from "react";
import axiosRequest from "@/api/index";
import axios from "axios";
import { ResData, User } from "@/@types/index";

import Link from "next/link";
import Image from "next/image";
import * as S from "./page.styled";

import Line from "@/components/common/Line";
import Button from "@/components/common/Button";

export default function Profile() {
  const [profile, setProfile] = useState<User>();
  //내 프로필 조회
  async function getProfile() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("get", "/user/profile", {});
      setProfile(response.data);
    } catch (error) {
      alert("프로필 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching profile data: ", error);
    }
  }
  useEffect(() => {
    getProfile();
  }, []);
  // const [nickname, setNickname] = useState(nickName);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setNickname(e.target.value);
    console.log();
  };
  //닉네임 변경
  // const NicknameInput = ({ prev }: { prev: string }) => {
  //   const [nickname, setNickname] = useState(prev);
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setNickname(e.target.value);
  //   };
  //   return <S.NicknameInput type="text" value={nickname} onChange={handleChange} />;
  // };
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
        <S.Row>
          <S.Title>프로필 사진</S.Title>
          <S.Content>
            {/* 기본이미지 픽스 후 수정예정 */}
            {/* <S.UserImg>{<Image src={profile?.profileImage} alt="default-image" width={120} height={120} />}</S.UserImg> */}
            <S.DeleteImgBtn>
              <Image src="/assets/img/icons/black-minus.svg" alt="delete-button" width={24} height={24} />
            </S.DeleteImgBtn>
            <S.EditImgBtn>
              <Image src="/assets/img/icons/modify.svg" alt="edit-button" width={24} height={24} />
            </S.EditImgBtn>
          </S.Content>
        </S.Row>
        <Line color="gray" size="horizontal" />
        <S.Row>
          <S.Title>이름</S.Title>
          <S.Content>
            <S.Input type="text" value={profile?.name} readOnly />
          </S.Content>
        </S.Row>{" "}
        <Line color="gray" size="horizontal" />
        <S.Row>
          <S.Title>이메일</S.Title>
          <S.Content>
            <S.Input type="text" value={profile?.email} readOnly />
          </S.Content>
        </S.Row>{" "}
        <Line color="gray" size="horizontal" />
        <S.Row>
          <S.Title>닉네임</S.Title>
          <S.Content>
            <S.NicknameInput type="text" value={profile?.nickName} onChange={handleChange} />
            {/* 중복확인 api 완료 후 수정예정 */}
            <S.DoubleCheck>중복확인</S.DoubleCheck>
          </S.Content>
        </S.Row>
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
