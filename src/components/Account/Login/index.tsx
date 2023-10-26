import { AxiosError } from "axios";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { User } from "@/@types/User";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { userAtom } from "@/recoil/atoms/user.atom";

import VALIDATE from "@/constants/regex";
import MESSAGE from "@/constants/message";

import Button from "@/components/common/Button";
import Input, { Label } from "@/components/common/Input";
import Line from "@/components/common/Line";

import * as S from "./index.styled";
import { Container, Error, InputGroup, MarginGroup } from "../index.styled";

interface PropsType {
  goToSignup: () => void;
  goToResetPassword: () => void;
  onClose: () => void;
}

export default function Login({ goToSignup, goToResetPassword, onClose }: PropsType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [_, setAuth] = useRecoilState(userAtom);
  const router = useRouter();

  async function googleLogin() {
    console.log("구글 로그인");
    router.push("/auth/google/callback");
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    VALIDATE.email.test(e.target.value) ? setEmailValid(true) : setEmailValid(false);
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    VALIDATE.password.test(e.target.value) ? setPasswordValid(true) : setPasswordValid(false);
  }

  async function submitLogin() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("post", "/auth/login", { email, password });

      if (response.status === 201) {
        alert("로그인이 성공적으로 완료되었습니다!");
        setAuth(prev => ({ ...prev, isAuth: true }));
        return onClose();
      }
      // 페이지 이동이 아닌 Side 모달 닫기 구현 -> 모달 recoil 사용하기
    } catch (error) {
      console.error("로그인 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, passwordValid]);

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
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleEmail}
          value={email}
          warning={!emailValid && email.length > 0}
        />
        {!emailValid && email.length > 0 && <Error>{MESSAGE.LOGIN.SYNTAX_EMAIL}</Error>}
      </InputGroup>
      <InputGroup>
        <Label id="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlePassword}
          value={password}
          warning={!passwordValid && password.length > 0}
        />
        {!passwordValid && password.length > 0 && <Error>{MESSAGE.LOGIN.SYNTAX_PASSWORD}</Error>}
        <S.UnderLine onClick={() => goToResetPassword()}>Forgot?</S.UnderLine>
      </InputGroup>
      <Button variant="reverse" shape="medium" size="big" onClick={submitLogin} disabled={notAllow}>
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
