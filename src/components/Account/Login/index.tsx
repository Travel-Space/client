import Button from "@/components/common/Button";
import * as S from "./index.styled";
import Input from "@/components/common/Input";
import Line from "@/components/common/Line";

interface LoginType {
  goToSignup: () => void;
  goToResetPassword: () => void;
}

export default function Login({ goToSignup, goToResetPassword }: LoginType) {
  return (
    <S.Wrap>
      <Button variant="gradient" shape="large" size="big">
        <S.Center>
          <img src="/assets/img/icons/google.svg" />
          <span>Log in with Google</span>
        </S.Center>
      </Button>
      <S.LineWithText>or log in with email</S.LineWithText>
      <S.InputGroup>
        <Input id="user-email" type="email" name="user-email" label="이메일" placeholder="Email" />
      </S.InputGroup>
      <S.InputGroup>
        <Input id="user-password" type="password" name="user-password" label="비밀번호" placeholder="Password" />
        <S.UnderLine onClick={() => goToResetPassword()}>Forgot?</S.UnderLine>
      </S.InputGroup>
      <Button variant="reverse" shape="medium" size="big">
        LOGIN
      </Button>
      <S.Margin>
        <Line size="horizontal" color="gray" />
      </S.Margin>
      <Button variant="gradient" shape="large" size="big" onClick={() => goToSignup()}>
        Sign Up
      </Button>
    </S.Wrap>
  );
}
