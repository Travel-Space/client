import * as S from "../common.styled";

interface LoginType {
  goToSignup: () => void;
  goToResetPassword: () => void;
}

export default function Login({ goToSignup, goToResetPassword }: LoginType) {
  return (
    <>
      <S.LinkButton>
        <img src="/assets/img/icons/google.svg" />
        <span>Log in with Google</span>
      </S.LinkButton>
      <S.LineWithText>or log in with email</S.LineWithText>
      <form>
        <S.InputGroup>
          <S.Label htmlFor="user-email">이메일</S.Label>
          <S.Input type="text" id="user-email" />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="user-password">비밀번호</S.Label>
          <S.Input type="password" id="user-password" />
          <S.UnderLineButton className="link-in-input" onClick={() => goToResetPassword()}>
            Forgot?
          </S.UnderLineButton>
        </S.InputGroup>
        <S.OutlineButton type="submit">LOGIN</S.OutlineButton>
      </form>
      <S.Line />
      <S.LinkButton onClick={() => goToSignup()}>Sign Up</S.LinkButton>
    </>
  );
}
