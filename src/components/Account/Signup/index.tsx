import Button from "@/components/common/Button";
import Input, { Label } from "@/components/common/Input";
import { useState } from "react";
import axios from "axios";
import { Container, InputGroup, SmallBtnGroup } from "../index.styled";
import Password from "../CheckInput/Password";
import Email from "../CheckInput/Email";

// 소셜 최초 가입 - 이름, 닉네임, 국적
// 일반 가입 - 이름, 닉네임, 이메일, 이메일인증, 비밀번호, 비밀번호 확인, 국적

let countryData = { name: "", engName: "", imageUrl: "" };

async function currentCountry() {
  try {
    // 현재 ip 기준 국적 코드
    const countryCode = await axios.get("https://ipapi.co/country");
    // 국적 정보
    const country = await axios.get(
      `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=sCpHMLPz%2FblcixtApQnF3nZPFJsIZH3AbF4f67%2BSbTTtFvQzHvZFufYkHaVZawgvV2%2B%2BnAyP7uiiO7HTnQNXoQ%3D%3D&returnType=JSON&cond[country_iso_alp2::EQ]=${countryCode.data}`,
    );
    const { country_nm, country_eng_nm, download_url } = country.data.data[0];
    countryData = { name: country_nm, engName: country_eng_nm, imageUrl: download_url };
  } catch (error) {
    console.error(error);
  }
}

currentCountry();

export default function Signup() {
  const [country, setCountry] = useState({
    name: countryData.name,
    engName: countryData.engName,
    imageUrl: countryData.imageUrl,
  });
  const [signupInput, setSignupInput] = useState({
    name: "",
    nickName: "",
    email: "",
    password: "",
  });
  const { name, nickName, email, password } = signupInput;

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setSignupInput(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSignup() {
    try {
      await axios.post("/auth/register", {
        email,
        name,
        nickName,
        password,
        nationality: country.name,
      });
    } catch (error) {
      console.error("회원가입 에러", error);
    }
  }

  return (
    <Container>
      {/* 필수 */}
      <InputGroup>
        <Label id="name">이름</Label>
        {/* 소셜 로그인 시 disabled */}
        <Input id="name" type="text" name="name" placeholder="Name" onChange={handleChange} />
      </InputGroup>
      <InputGroup>
        <Label id="nickName">닉네임</Label>
        <InputGroup>
          <Input id="nickName" type="text" name="nickName" placeholder="NickName" onChange={handleChange} />
          {/* <SmallBtnGroup>
            <Button variant="confirm" shape="small" size="smallWithXsFont" disabled={isDisabled.confirmNickName}>
              중복확인
            </Button>
          </SmallBtnGroup> */}
        </InputGroup>
      </InputGroup>

      {/* 일반 회원가입 시 추가 입력 */}
      <Email onEmail={handleEmail} />
      <Password onPasswordCompare={handlePasswordCompare} />

      {/* 필수 */}
      <InputGroup>
        <Label id="nationality">국적</Label>
        <InputGroup>
          <Input
            id="nationality"
            type="text"
            name="nationality"
            readOnly
            value={`${country.name}, ${country.engName}`}
          />
          <SmallBtnGroup $country>
            <img src={country.imageUrl} alt={country.name} />
          </SmallBtnGroup>
        </InputGroup>
      </InputGroup>
      <Button variant="confirm" shape="medium" size="big" onClick={handleSignup}>
        Sign Up
      </Button>
    </Container>
  );
}
