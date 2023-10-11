import * as S from "../../common.styled";

// 소셜 최초 가입 - 이름, 닉네임, 국적
export default function Social() {
  return (
    <>
      <S.InputGroup>
        <S.Label htmlFor="user-name">이름</S.Label>
        <S.Input type="text" id="user-name" readOnly disabled />
      </S.InputGroup>
      <S.InputGroup>
        <S.Label htmlFor="user-nickName">닉네임</S.Label>
        <S.InputBox>
          <S.Input type="text" id="user-nickName" />
          <S.SmallButton className="button-in-input">중복확인</S.SmallButton>
        </S.InputBox>
      </S.InputGroup>
      <S.InputGroup>
        <S.Label htmlFor="user-country">국적</S.Label>
        <S.Input type="text" id="user-country" readOnly />
        <img src="" />
      </S.InputGroup>
    </>
  );
}
