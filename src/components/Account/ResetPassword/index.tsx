import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import axiosRequest from "@/api";

import { ResData, User } from "@/@types";

import Line from "@/components/common/Line";
import Button from "@/components/common/Button";

import Email from "../AuthInputs/Email";
import Password from "../AuthInputs/Password";
import { Container, MarginGroup } from "../index.styled";

import VALIDATE from "@/constants/regex";
import STATUS_CODE from "@/constants/statusCode";

interface PropsType {
  goToLogin: () => void;
}

export default function ResetPassword({ goToLogin }: PropsType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [isPasswordMatching, setIsPasswordMatching] = useState(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);

  const handlePasswordCompare = (result: boolean, value: string) => {
    setIsPasswordMatching(result);
    setPassword(value);
    VALIDATE.USER.PASSWORD.test(value) ? setPasswordValid(true) : setPasswordValid(false);
  };

  const handleEmail = (result: boolean, value: string) => {
    setIsEmailConfirm(result);
    setEmail(value);
  };

  const submitSignin = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("post", "/auth/passwordChange", {
        email,
        password,
      });
      if (response.status === STATUS_CODE.CREATED) alert("비밀번호가 성공적으로 변경되었습니다.");
      return goToLogin();
    } catch (error) {
      console.error("비밀번호 재설정 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    if (passwordValid && isPasswordMatching && isEmailConfirm) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [passwordValid, isPasswordMatching, isEmailConfirm]);
  return (
    <Container>
      <Email onEmail={handleEmail} />

      <MarginGroup>
        <Line size="horizontal" color="gray" />
      </MarginGroup>

      <Password onPasswordCompare={handlePasswordCompare} valid={!passwordValid && password} />

      <Button variant="confirm" shape="medium" size="big" onClick={submitSignin} disabled={notAllow}>
        Reset Password
      </Button>
    </Container>
  );
}
