"use client";
import Image from "next/image";
import * as S from "./page.styled";

import Divider from "../../Divider";

export default function Profile() {
  return (
    <S.Container>
      <S.Main>
        <S.Row>
          <S.Title>프로필 사진</S.Title>
          <S.Content>
            <S.UserImg src="/assets/img/icons/default-user.svg" alt="" />
            <S.DeleteImgBtn>
              <Image src="/assets/img/icons/black-minus.svg" alt="delete-button" width={24} height={24} />
            </S.DeleteImgBtn>
            <S.EditImgBtn>
              <Image src="/assets/img/icons/modify.svg" alt="edit-button" width={24} height={24} />
            </S.EditImgBtn>
          </S.Content>
        </S.Row>
        <Divider width="100%" height="1px" />
        <S.Row>
          <S.Title>이름</S.Title>
          <S.Content>
            <S.Input type="text" value={"홍길동"} readOnly />
          </S.Content>
        </S.Row>{" "}
        <Divider width="100%" height="1px" />
        <S.Row>
          <S.Title>이메일</S.Title>
          <S.Content>
            <S.Input type="text" value={"user-email@gmail.com"} readOnly />
          </S.Content>
        </S.Row>{" "}
        <Divider width="100%" height="1px" />
        <S.Row>
          <S.Title>닉네임</S.Title>
          <S.Content>
            <S.NicknameInput type="text" value={"곰숨곰숨짱"} />
            <S.DoubleCheck>중복확인</S.DoubleCheck>
          </S.Content>
        </S.Row>
      </S.Main>
      <S.Footer>
        <S.Withdrawal>
          <div>* 더 이상 Travel Space 이용을 원하지 않는다면 </div>
          <button>회원탈퇴</button>
        </S.Withdrawal>
        <S.Save>변경 사항 저장</S.Save>
      </S.Footer>
    </S.Container>
  );
}
