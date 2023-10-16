import * as S from "../common.styled";

export default function ResetPassword() {
  return (
    <>
      <form>
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

        <S.Line />

        <S.InputGroup>
          <S.Label htmlFor="user-password">비밀번호</S.Label>
          <S.Input type="password" id="user-password" />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="user-password-check">비밀번호 확인</S.Label>
          <S.Input type="password" id="user-password-check" />
        </S.InputGroup>

        <S.FillButton type="submit">Reset Password</S.FillButton>
      </form>
    </>
  );
}
