import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import VALIDATE from "@/constants/regex";

import Line from "@/components/common/Line";
import Button from "@/components/common/Button";
import Email from "../CommonInput/Email";
import Password from "../CommonInput/Password";

import { Container, MarginGroup } from "../index.styled";

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

  const regexPassword = new RegExp(VALIDATE.password);

  function handlePasswordCompare(result: boolean, value: string) {
    setIsPasswordMatching(result);
    setPassword(value);
    regexPassword.test(password) ? setPasswordValid(true) : setPasswordValid(false);
  }

  function handleEmail(result: boolean, value: string) {
    setIsEmailConfirm(result);
    setEmail(value);
  }

  async function submitSignin() {
    try {
      const response = await axios.post("/auth/passwordChange", { email, password });
      response.data.success && alert(response.data.message);
      return goToLogin();
    } catch (error) {
      // console.error("비밀번호 재설정 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

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

      <Password onPasswordCompare={handlePasswordCompare} valid={!passwordValid && password.length > 0} />

      <Button variant="confirm" shape="medium" size="big" onClick={submitSignin} disabled={notAllow}>
        Reset Password
      </Button>
    </Container>
  );
}
