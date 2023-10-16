import * as S from "../../common.styled";

// 일반 가입 - 이름, 닉네임, 이메일, 이메일인증, 비밀번호, 비밀번호 확인, 국적
export default function Basic() {
  return (
    <>
      <S.InputGroup>
        <S.Label htmlFor="user-name">이름</S.Label>
        <S.Input type="text" id="user-name" />
      </S.InputGroup>
      <S.InputGroup>
        <S.Label htmlFor="user-nickName">닉네임</S.Label>
        <S.InputBox>
          <S.Input type="text" id="user-nickName" />
          <S.SmallButton className="button-in-input">중복확인</S.SmallButton>
        </S.InputBox>
      </S.InputGroup>
      <S.InputGroup>
        <S.Label htmlFor="user-email">이메일</S.Label>
        <S.InputBox>
          <S.Input type="text" id="user-email" />
          <S.SmallButton className="button-in-input">인증</S.SmallButton>
        </S.InputBox>
      </S.InputGroup>
      <S.InputGroup>
        <S.Input type="text" />
        <S.SmallButton className="button-in-input">인증확인</S.SmallButton>
      </S.InputGroup>
      <S.InputGroup>
        <S.Label htmlFor="user-password">비밀번호</S.Label>
        <S.Input type="password" id="user-password" />
      </S.InputGroup>
      <S.InputGroup>
        <S.Label htmlFor="user-password-check">비밀번호 확인</S.Label>
        <S.Input type="password" id="user-password-check" />
      </S.InputGroup>
      <S.InputGroup>
        <S.Label htmlFor="user-country">국적</S.Label>
        <S.Input type="text" id="user-country" readOnly />
        <img src="" />
      </S.InputGroup>
    </>
  );
}
