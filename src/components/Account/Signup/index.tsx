import axios, { AxiosError } from "axios";
import { ResData, User } from "@/@types";
import axiosRequest from "@/api";
import { useEffect, useState } from "react";
import VALIDATE from "@/constants/regex";
import MESSAGE from "@/constants/message";

import Button from "@/components/common/Button";
import Input, { Label } from "@/components/common/Input";
import Password from "../CommonInput/Password";
import Email from "../CommonInput/Email";

import { Container, CountryGroup, Error, InputGroup, SmallBtnGroup } from "../index.styled";
import { CountryInfo } from "@/@types/User";
import SearchCountry from "@/components/common/SearchCountry";

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

  const [nameValid, setNameValid] = useState(false);
  const [nickNameValid, setNickNameValid] = useState(false);
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [isPasswordMatching, setIsPasswordMatching] = useState(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);

  const [country, setCountry] = useState<CountryInfo>({
    country_nm: "",
    country_eng_nm: "",
    download_url: "",
  });
  const [showSearch, setShowSearch] = useState(false);

  // CORS 에러 수정 예정
  async function currentCountry() {
    try {
      // 현재 ip 기준 국적 코드
      const countryCode = await axios.get("https://ipapi.co/country");
      // 국적 정보
      const country = await axios.get(
        `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=sCpHMLPz%2FblcixtApQnF3nZPFJsIZH3AbF4f67%2BSbTTtFvQzHvZFufYkHaVZawgvV2%2B%2BnAyP7uiiO7HTnQNXoQ%3D%3D&returnType=JSON&cond[country_iso_alp2::EQ]=${countryCode.data}`,
      );
      setCountry(country.data.data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    VALIDATE.name.test(e.target.value) ? setNameValid(true) : setNameValid(false);
  }

  function handleNickName(e: React.ChangeEvent<HTMLInputElement>) {
    setNickName(e.target.value);
    VALIDATE.nickName.test(e.target.value) ? setNickNameValid(true) : setNickNameValid(false);
    setNickNameCheck(false);
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

  function handleCountry(country: CountryInfo) {
    setCountry(country);
  }

  async function submitSignin() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("post", "/auth/register", {
        email,
        name,
        nickName,
        password,
        nationality: country.country_nm,
      });

      response.status === 201 && alert("회원가입이 성공적으로 완료되었습니다!");
      return goToLogin();
    } catch (error) {
      console.error("회원가입 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  async function checkNickName() {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ available: boolean }>>(
        "get",
        `/user/check-nickname?nickname=${nickName}`,
        {},
      );
      console.log(response);
      setNickNameCheck(response.data.available);
      response.data.available ? alert("사용가능한 닉네임입니다.") : alert("중복된 닉네임입니다. 다시 작성해주세요.");
    } catch (error) {
      console.error("닉네임 중복확인 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    if (nameValid && nickNameValid && passwordValid && isPasswordMatching && isEmailConfirm && nickNameCheck) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, nickNameValid, passwordValid, isPasswordMatching, isEmailConfirm, nickNameCheck]);

  useEffect(() => {
    // currentCountry();
  }, []);

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
          <SmallBtnGroup>
            <Button
              variant="confirm"
              shape="small"
              size="smallWithXsFont"
              disabled={!nickNameValid}
              onClick={checkNickName}
            >
              중복확인
            </Button>
          </SmallBtnGroup>
        </InputGroup>
      </InputGroup>

      {/* 일반 회원가입 시 추가 입력 */}
      <Email onEmail={handleEmail} />
      <Password onPasswordCompare={handlePasswordCompare} valid={!passwordValid && password.length > 0} />

      {/* 필수 */}
      <InputGroup>
        <Label id="nationality">국적</Label>
        <CountryGroup>
          <Input
            id="nationality"
            type="text"
            name="nationality"
            readOnly
            value={`${country.country_nm}, ${country.country_eng_nm}`}
            onClick={() => setShowSearch(prev => !prev)}
          />
          <SmallBtnGroup $country>
            <img src={country.download_url} alt={country.country_nm} />
          </SmallBtnGroup>
          {showSearch && <SearchCountry onCountry={handleCountry} onClose={() => setShowSearch(false)} />}
        </CountryGroup>
      </InputGroup>

      <Button variant="confirm" shape="medium" size="big" onClick={submitSignin} disabled={notAllow}>
        Sign Up
      </Button>
    </Container>
  );
}
