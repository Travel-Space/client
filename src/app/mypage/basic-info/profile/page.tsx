"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/@types/User";

import Link from "next/link";
import Image from "next/image";
import * as S from "./page.styled";

import Line from "@/components/common/Line";
import Button from "@/components/common/Button";

export default function Profile() {
  //내 프로필 조회
  const fetchProfile = async () => {
    return axios.get("/user/profile").then(response => response.data);
  };

  const { isLoading, data, isError, error } = useQuery<User, Error, User>({
    queryKey: ["get-profile"],
    queryFn: fetchProfile,
  });
  console.log("fetchProfile", data);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  const { name, nickName, email, profileImage } = data as User;

  const [nickname, setNickname] = useState(nickName);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleClick = () => {
    console.log();
  };
  return (
    <S.Container>
      <S.Main>
        <S.Row>
          <S.Title>프로필 사진</S.Title>
          <S.Content>
            {/* 기본이미지 픽스 후 수정예정 */}
            {/* <S.UserImg>{<Image src={profileImage} alt="default-image" width={120} height={120} />}</S.UserImg> */}
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
            <S.Input type="text" value={name} readOnly />
          </S.Content>
        </S.Row>{" "}
        <Line color="gray" size="horizontal" />
        <S.Row>
          <S.Title>이메일</S.Title>
          <S.Content>
            <S.Input type="text" value={email} readOnly />
          </S.Content>
        </S.Row>{" "}
        <Line color="gray" size="horizontal" />
        <S.Row>
          <S.Title>닉네임</S.Title>
          <S.Content>
            <S.NicknameInput type="text" value={nickname} onChange={handleChange} />
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
          <Button variant="confirm" shape="medium" size="big" onClick={handleClick}>
            변경 사항 저장
          </Button>
        </S.Save>
      </S.Footer>
    </S.Container>
  );
}
