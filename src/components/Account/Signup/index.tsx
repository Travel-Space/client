import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import VALIDATE from "@/constants/regex";
import MESSAGE from "@/constants/message";

import Button from "@/components/common/Button";
import Input, { Label } from "@/components/common/Input";
import Password from "../CommonInput/Password";
import Email from "../CommonInput/Email";
import Country from "../CommonInput/Country";

import { Container, Error, InputGroup } from "../index.styled";

// 소셜 최초 가입 - 이름, 닉네임, 국적
// 일반 가입 - 이름, 닉네임, 이메일, 이메일인증, 비밀번호, 비밀번호 확인, 국적

interface PropsType {
  goToLogin: () => void;
}

export default function Signup({ goToLogin }: PropsType) {
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationality, setNationality] = useState("");

  const [nameValid, setNameValid] = useState(false);
  const [nickNameValid, setNickNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [isPasswordMatching, setIsPasswordMatching] = useState(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    VALIDATE.name.test(e.target.value) ? setNameValid(true) : setNameValid(false);
  }

  function handleNickName(e: React.ChangeEvent<HTMLInputElement>) {
    setNickName(e.target.value);
    VALIDATE.nickName.test(e.target.value) ? setNickNameValid(true) : setNickNameValid(false);
  }

  function handlePasswordCompare(result: boolean, value: string) {
    setIsPasswordMatching(result);
    setPassword(value);
    VALIDATE.password.test(value) ? setPasswordValid(true) : setPasswordValid(false);
  }

  function handleEmail(result: boolean, value: string) {
    setIsEmailConfirm(result);
    setEmail(value);
  }

  function handleCountry(country: string) {
    setNationality(country);
  }

  async function submitSignin() {
    try {
      const response = await axios.post("/auth/register", { email, name, nickName, password, nationality });
      response.status === 201 && alert("회원가입이 성공적으로 완료되었습니다!");
      return goToLogin();
    } catch (error) {
      // console.error("회원가입 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    if (nameValid && nickNameValid && passwordValid && isPasswordMatching && isEmailConfirm) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, nickNameValid, passwordValid, isPasswordMatching, isEmailConfirm]);

  return (
    <Container>
      {/* 필수 */}
      <InputGroup>
        <Label id="name">이름</Label>
        {/* 소셜 로그인 시 disabled */}
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleName}
          warning={!nameValid && name.length > 0}
        />
        {!nameValid && name.length > 0 && <Error>{MESSAGE.JOIN.SYNTAX_NAME}</Error>}
      </InputGroup>
      <InputGroup>
        <Label id="nickName">닉네임</Label>
        <InputGroup>
          <Input
            id="nickName"
            type="text"
            name="nickName"
            placeholder="NickName"
            value={nickName}
            onChange={handleNickName}
            warning={!nickNameValid && nickName.length > 0}
          />
          {!nickNameValid && nickName.length > 0 && <Error>{MESSAGE.JOIN.SYNTAX_NICKNAME}</Error>}
        </InputGroup>
      </InputGroup>

      {/* 일반 회원가입 시 추가 입력 */}
      <Email onEmail={handleEmail} />
      <Password onPasswordCompare={handlePasswordCompare} valid={!passwordValid && password.length > 0} />

      {/* 필수 */}
      <Country onCountry={handleCountry} />

      <Button variant="confirm" shape="medium" size="big" onClick={submitSignin} disabled={notAllow}>
        Sign Up
      </Button>
    </Container>
  );
}
