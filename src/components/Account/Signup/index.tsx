"use client";

import axios, { isAxiosError } from "axios";
import { ResData, User } from "@/@types";
import axiosRequest from "@/api";
import { useEffect, useState } from "react";
import VALIDATE from "@/constants/regex";
import MESSAGE from "@/constants/message";

import Button from "@/components/common/Button";
import Input, { Label } from "@/components/common/Input";
import Password from "../AuthInputs/Password";
import Email from "../AuthInputs/Email";

import { Container, CountryGroup, InputGroup, SmallBtnGroup } from "@/components/Account/index.styled";
import { CountryInfo } from "@/@types/User";
import SearchCountry from "@/components/common/SearchCountry";
import { useRouter, useSearchParams } from "next/navigation";
import STATUS_CODE from "@/constants/statusCode";
import { ErrorMessage } from "@/styles/common";

// 소셜 최초 가입 - 이름, 닉네임, 국적
// 일반 가입 - 이름, 닉네임, 이메일, 이메일인증, 비밀번호, 비밀번호 확인, 국적

const PROFILE_IMAGE: string = "/assets/img/icons/default-user.svg";

interface PropsType {
  goToLogin?: () => void;
  socialType?: boolean;
}

export default function Signup({ goToLogin, socialType }: PropsType) {
  const params = useSearchParams();
  const emailParams: string | null = params.get("email");
  const nameParams: string | null = params.get("name");

  const router = useRouter();

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

  const currentCountry = async () => {
    try {
      if (typeof window !== "undefined") {
        // 현재 ip 기준 국적 코드
        const countryCode = await axios.get(`${window.location.origin}/country`);
        // 국적 정보
        const country = await axios.get(
          `${window.location.origin}/countryData/getCountryFlagList2?serviceKey=${process.env.NEXT_PUBLIC_COUNTRY_API_KEY}&returnType=JSON&cond[country_iso_alp2::EQ]=${countryCode.data}`,
        );
        setCountry(country.data.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    VALIDATE.USER.NAME.test(e.target.value) ? setNameValid(true) : setNameValid(false);
  };

  const handleNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    VALIDATE.USER.NICKNAME.test(e.target.value) ? setNickNameValid(true) : setNickNameValid(false);
    setNickNameCheck(false);
  };

  const handlePasswordCompare = (result: boolean, value: string) => {
    setIsPasswordMatching(result);
    setPassword(value);
    VALIDATE.USER.PASSWORD.test(value) ? setPasswordValid(true) : setPasswordValid(false);
  };

  const handleEmail = (result: boolean, value: string) => {
    setIsEmailConfirm(result);
    setEmail(value);
  };

  const handleCountry = (country: CountryInfo) => {
    setCountry(country);
  };

  const socialSignup = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("post", "/auth/register/google", {
        email,
        name,
        nickName,
        nationality: country.country_nm,
        nationImage: country.download_url,
        profileImage: PROFILE_IMAGE,
      });

      if (response.status === STATUS_CODE.CREATED) {
        alert("회원가입이 성공적으로 완료되었습니다!");
        router.push("/");
      }
    } catch (error) {
      console.error("회원가입 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const submitSignup = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("post", "/auth/register", {
        email,
        name,
        nickName,
        password,
        nationality: country.country_nm,
        nationImage: country.download_url,
        profileImage: PROFILE_IMAGE,
      });

      if (response.status === STATUS_CODE.CREATED) alert("회원가입이 성공적으로 완료되었습니다!");

      return goToLogin && goToLogin();
    } catch (error) {
      console.error("회원가입 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const checkNickName = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<{ available: boolean }>>(
        "get",
        `/user/check-nickname?nickname=${nickName}`,
        {},
      );
      console.log(response);
      setNickNameCheck(response.data.available);
      if (response.data.available) {
        alert("사용가능한 닉네임입니다.");
      } else {
        alert("중복된 닉네임입니다. 다시 작성해 주세요.");
        setNickName("");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    const isSocialType = socialType && nameValid && nickNameValid && nickNameCheck;
    const isBasicType =
      !socialType &&
      nameValid &&
      nickNameValid &&
      passwordValid &&
      isPasswordMatching &&
      isEmailConfirm &&
      nickNameCheck;

    if (isSocialType || isBasicType) {
      setNotAllow(false);
      return;
    }

    setNotAllow(true);
  }, [nameValid, nickNameValid, passwordValid, isPasswordMatching, isEmailConfirm, nickNameCheck]);

  useEffect(() => {
    currentCountry();
    nameParams && setName(nameParams);
    emailParams && setEmail(emailParams);
  }, []);

  useEffect(() => {
    console.log(name);
  }, [name]);

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
          warning={!nameValid && name}
        />
        {!nameValid && name && <ErrorMessage>{MESSAGE.JOIN.SYNTAX_NAME}</ErrorMessage>}
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
            warning={!nickNameValid && nickName}
          />
          {!nickNameValid && nickName && <ErrorMessage>{MESSAGE.JOIN.SYNTAX_NICKNAME}</ErrorMessage>}
          <SmallBtnGroup>
            <Button
              variant="confirm"
              shape="small"
              size="smallWithXsFont"
              disabled={!nickNameValid || !nickName}
              onClick={checkNickName}
            >
              중복 확인
            </Button>
          </SmallBtnGroup>
        </InputGroup>
      </InputGroup>

      {!socialType && (
        <>
          {/* 일반 회원가입 시 추가 입력 */}
          <Email onEmail={handleEmail} />
          <Password onPasswordCompare={handlePasswordCompare} valid={!passwordValid && password} />
        </>
      )}

      {/* 필수 */}
      <InputGroup>
        <Label id="nationality">국적</Label>
        <CountryGroup>
          <span onClick={() => setShowSearch(prev => !prev)}>
            {country.country_nm}, {country.country_eng_nm}
          </span>
          <SmallBtnGroup $country onClick={() => setShowSearch(prev => !prev)}>
            <img src={country.download_url} alt={country.country_nm} />
          </SmallBtnGroup>
          {showSearch && <SearchCountry onCountry={handleCountry} onClose={() => setShowSearch(false)} />}
        </CountryGroup>
      </InputGroup>

      <Button
        variant="confirm"
        shape="medium"
        size="big"
        onClick={socialType ? socialSignup : submitSignup}
        disabled={notAllow}
      >
        Sign Up
      </Button>
    </Container>
  );
}
