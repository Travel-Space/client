import Button from "@/components/common/Button";
import * as S from "./index.styled";
import Input, { Label } from "@/components/common/Input";
import Line from "@/components/common/Line";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

interface PropsType {
  goToSignup: () => void;
  goToResetPassword: () => void;
}

interface LoginType {
  email: string;
  password: string;
}

export default function Login({ goToSignup, goToResetPassword }: PropsType) {
  // useRef로 구현? useState로 구현?
  const [loginInput, setLoginInput] = useState<LoginType>({ email: "", password: "" });
  const [_, setAuth] = useRecoilState(userAtom);
  const { email, password } = loginInput;

  async function googleLogin() {
    console.log("구글 로그인");
    // try {
    //   const response = await axios.post("/auth/google-login");
    // } catch (error) {
    //   console.error(error);
    // }
  }

  async function handleLogin() {
    try {
      await axios.post("/auth/login", loginInput);
      setAuth(prev => ({ ...prev, isAuth: true }));
      // 페이지 이동이 아닌 Side 모달 닫기 구현 -> 모달 recoil 사용하기
    } catch (error) {
      console.error("로그인 에러", error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  }

  return (
    <S.Wrap>
      <Button variant="gradient" shape="large" size="big" onClick={googleLogin}>
        <S.CenterGroup>
          <img src="/assets/img/icons/google.svg" />
          <span>Log in with Google</span>
        </S.CenterGroup>
      </Button>
      <S.LineWithText>or log in with email</S.LineWithText>
      <S.InputGroup>
        <Label id="email">이메일</Label>
        <Input id="email" type="email" name="email" placeholder="Email" onChange={handleChange} />
      </S.InputGroup>
      <S.InputGroup>
        <Label id="user-password">비밀번호</Label>
        <Input id="password" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <S.UnderLine onClick={() => goToResetPassword()}>Forgot?</S.UnderLine>
      </S.InputGroup>
      <Button variant="reverse" shape="medium" size="big" onClick={handleLogin}>
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
