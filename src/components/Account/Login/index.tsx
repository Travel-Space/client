import Button from "@/components/common/Button";
import * as S from "./index.styled";
import Input, { Label } from "@/components/common/Input";
import Line from "@/components/common/Line";
import axios from "axios";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import { useRouter } from "next/navigation";
import { Container, InputGroup, MarginGroup } from "../index.styled";

interface PropsType {
  goToSignup: () => void;
  goToResetPassword: () => void;
}

export default function Login({ goToSignup, goToResetPassword }: PropsType) {
  const emailInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const [_, setAuth] = useRecoilState(userAtom);
  const router = useRouter();

  async function googleLogin() {
    console.log("구글 로그인");
    router.push("/auth/google");
    //   try {
    //     await axios.get("/auth/google/callback");
    //   } catch (error) {
    //     console.error(error);
    //   }
  }

  async function handleLogin() {
    try {
      await axios.post("/auth/login", { email: emailInput.current?.value, password: passwordInput.current?.value });
      setAuth(prev => ({ ...prev, isAuth: true }));
      // 페이지 이동이 아닌 Side 모달 닫기 구현 -> 모달 recoil 사용하기
    } catch (error) {
      console.error("로그인 에러", error);
    }
  }

  return (
    <Container>
      <Button variant="gradient" shape="large" size="big" onClick={googleLogin}>
        <S.CenterGroup>
          <img src="/assets/img/icons/google.svg" />
          <span>Log in with Google</span>
        </S.CenterGroup>
      </Button>
      <S.LineWithText>or log in with email</S.LineWithText>
      <InputGroup>
        <Label id="email">이메일</Label>
        <Input id="email" type="email" name="email" placeholder="Email" ref={emailInput} />
      </InputGroup>
      <InputGroup>
        <Label id="user-password">비밀번호</Label>
        <Input id="password" type="password" name="password" placeholder="Password" ref={passwordInput} />
        <S.UnderLine onClick={() => goToResetPassword()}>Forgot?</S.UnderLine>
      </InputGroup>
      <Button variant="reverse" shape="medium" size="big" onClick={handleLogin}>
        LOGIN
      </Button>

      <MarginGroup>
        <Line size="horizontal" color="gray" />
      </MarginGroup>

      <Button variant="gradient" shape="large" size="big" onClick={() => goToSignup()}>
        Create Account
      </Button>
    </Container>
  );
}
