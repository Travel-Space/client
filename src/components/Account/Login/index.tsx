import Button from "@/components/common/Button";
import * as S from "./index.styled";
import Input, { Label } from "@/components/common/Input";
import Line from "@/components/common/Line";

interface LoginType {
  goToSignup: () => void;
  goToResetPassword: () => void;
}

export default function Login({ goToSignup, goToResetPassword }: LoginType) {
  return (
    <S.Wrap>
      <Button variant="gradient" shape="large" size="big">
        <S.CenterGroup>
          <img src="/assets/img/icons/google.svg" />
          <span>Log in with Google</span>
        </S.CenterGroup>
      </Button>
      <S.LineWithText>or log in with email</S.LineWithText>
      <S.InputGroup>
        <Label id="user-email">이메일</Label>
        <Input id="user-email" type="email" name="user-email" placeholder="Email" />
      </S.InputGroup>
      <S.InputGroup>
        <Label id="user-password">비밀번호</Label>
        <Input id="user-password" type="password" name="user-password" placeholder="Password" />
        <S.UnderLine onClick={() => goToResetPassword()}>Forgot?</S.UnderLine>
      </S.InputGroup>
      <Button variant="reverse" shape="medium" size="big">
        LOGIN
      </Button>

      <S.MarginGroup>
        <Line size="horizontal" color="gray" />
      </S.MarginGroup>

      <Button variant="gradient" shape="large" size="big" onClick={() => goToSignup()}>
        Create Account
      </Button>
    </S.Wrap>
  );
}
