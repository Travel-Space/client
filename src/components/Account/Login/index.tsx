import * as S from "../common.styled";
import Input from "@/components/common/Input";

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
          <Input id="user-email" type="email" name="user-email" label="이메일" />
        </S.InputGroup>
        <S.InputGroup>
          <Input id="user-password" type="password" name="user-password" label="비밀번호" />
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
