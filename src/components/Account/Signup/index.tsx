import Button from "@/components/common/Button";
import Input, { Label } from "@/components/common/Input";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Container, Error, InputGroup } from "../index.styled";
import Password from "../CommonInput/Password";
import Email from "../CommonInput/Email";
import Country from "../CommonInput/Country";

// 소셜 최초 가입 - 이름, 닉네임, 국적
// 일반 가입 - 이름, 닉네임, 이메일, 이메일인증, 비밀번호, 비밀번호 확인, 국적

export default function Signup() {
  const [signupInput, setSignupInput] = useState({
    name: "",
    nickName: "",
    email: "",
    password: "",
    nationality: "",
  });
  const { name, nickName, email, password, nationality } = signupInput;
  const [errorList, setErrorList] = useState({
    name: { state: false, message: "2글자 이상 8글자 이하로 입력해주세요." },
    nickName: {
      state: false,
      message: "2글자 이상 8글자 이하로 입력해주세요.",
    },
    // email: {
    //   state: false,
    //   message: "이메일 형식에 맞게 입력해주세요.",
    // },
    // password: {
    //   state: false,
    //   message: "6글자 이상으로 입력해주세요.",
    // },
  });

  const [isPasswordMatching, setIsPasswordMatching] = useState(true);

  function handlePasswordCompare(result: boolean, password: string) {
    setIsPasswordMatching(result);
    setSignupInput(prev => ({
      ...prev,
      password,
    }));
  }

  function handleEmail(email: string) {
    setSignupInput(prev => ({
      ...prev,
      email,
    }));
  }

  function handleCountry(country: string) {
    setSignupInput(prev => ({
      ...prev,
      nationality: country,
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setSignupInput(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSignup() {
    // console.log(Object.hasOwn(errorList.name, "state"));
    // setErrorList(prev => ({
    //   ...prev,
    //   name: { ...prev.name, state: !name && (name.length < 2 || name.length > 8) },
    //   nickName: { ...prev.nickName, state: !nickName && (name.length < 2 || name.length > 8) },
    // }));

    try {
      await axios.post("/auth/register", {
        email,
        name,
        nickName,
        password,
        nationality,
      });
    } catch (error) {
      // console.error("회원가입 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      console.log(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    setErrorList(prev => ({
      ...prev,
      name: { ...prev.name, state: name !== "" && (name.length < 2 || name.length > 8) },
      nickName: { ...prev.nickName, state: nickName !== "" && (nickName.length < 2 || nickName.length > 8) },
    }));
  }, [name, nickName]);

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
          onChange={handleChange}
          warning={errorList.name.state}
        />
        {errorList.name.state && <Error>{errorList.name.message}</Error>}
      </InputGroup>
      <InputGroup>
        <Label id="nickName">닉네임</Label>
        <InputGroup>
          <Input
            id="nickName"
            type="text"
            name="nickName"
            placeholder="NickName"
            onChange={handleChange}
            warning={errorList.nickName.state}
          />
          {errorList.nickName.state && <Error>{errorList.nickName.message}</Error>}
        </InputGroup>
      </InputGroup>

      {/* 일반 회원가입 시 추가 입력 */}
      <Email onEmail={handleEmail} />
      <Password onPasswordCompare={handlePasswordCompare} />

      {/* 필수 */}
      <Country onCountry={handleCountry} />

      <Button variant="confirm" shape="medium" size="big" onClick={handleSignup}>
        Sign Up
      </Button>
    </Container>
  );
}
