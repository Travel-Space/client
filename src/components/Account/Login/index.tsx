import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { UserType, userAtom } from "@/recoil/atoms/user.atom";
import { Default } from "@/@types/Modal";

import VALIDATE from "@/constants/regex";
import MESSAGE from "@/constants/message";
import STATUS_CODE from "@/constants/statusCode";

import Button from "@/components/common/Button";
import Input, { Label } from "@/components/common/Input";
import Line from "@/components/common/Line";
import * as LOGIN from "./index.styled";
import { Container, FormGroup, InputGroup, MarginGroup } from "@/components/Account/index.styled";
import { ErrorMessage } from "@/styles/common";

interface PropsType extends Default {
  goToSignup: () => void;
  goToResetPassword: () => void;
}

export default function Login({ goToSignup, goToResetPassword, onClose }: PropsType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const setAuth = useSetRecoilState(userAtom);

  const googleLogin = async () => {
    console.log("구글 로그인");
    window.location.href = "https://travelspace.world/api/auth/google";
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    VALIDATE.USER.EMAIL.test(e.target.value) ? setEmailValid(true) : setEmailValid(false);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    VALIDATE.USER.PASSWORD.test(e.target.value) ? setPasswordValid(true) : setPasswordValid(false);
  };

  const submitLogin = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<UserType>>("post", "/auth/login", { email, password });
      console.log(response);
      const data = response.data;
      const { planets, spaceships } = data.memberships;
      const memberships = { planets, spaceships };
      if (response.status === STATUS_CODE.CREATED) {
        alert("로그인이 성공적으로 완료되었습니다!");
        setAuth(prev => ({
          ...prev,
          isAuth: true,
          nickName: data.nickName,
          role: data.role,
          id: data.id,
          memberships,
        }));
        return onClose();
      }
    } catch (error) {
      console.error("로그인 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

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
        <LOGIN.CenterGroup>
          <img src="/assets/img/icons/google.svg" />
          <span>Log in with Google</span>
        </LOGIN.CenterGroup>
      </Button>

      <LOGIN.LineWithText>or Log in with email</LOGIN.LineWithText>

      <FormGroup
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          submitLogin();
        }}
      >
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
          {!emailValid && email.length > 0 && <ErrorMessage>{MESSAGE.LOGIN.SYNTAX_EMAIL}</ErrorMessage>}
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
          {!passwordValid && password.length > 0 && <ErrorMessage>{MESSAGE.LOGIN.SYNTAX_PASSWORD}</ErrorMessage>}
          <LOGIN.UnderLine onClick={() => goToResetPassword()} type="button">
            Forgot?
          </LOGIN.UnderLine>
        </InputGroup>
        <Button variant="reverse" shape="medium" size="big" disabled={notAllow}>
          LOGIN
        </Button>
      </FormGroup>

      <MarginGroup>
        <Line size="horizontal" color="gray" />
      </MarginGroup>

      <Button variant="gradient" shape="large" size="big" onClick={() => goToSignup()}>
        Create Account
      </Button>
    </Container>
  );
}
