import { isAxiosError } from "axios";
import { ResData } from "@/@types";
import { User } from "@/@types/User";
import axiosRequest from "@/api";
import { useEffect, useState } from "react";
import VALIDATE from "@/constants/regex";
import MESSAGE from "@/constants/message";

import Input, { Label } from "@/components/common/Input";
import Button from "@/components/common/Button";

import { InputGroup, SmallBtnGroup, Timer } from "@/components/Account/index.styled";
import STATUS_CODE from "@/constants/statusCode";
import { ErrorMessage } from "@/styles/common";

interface PropsType {
  onEmail: (result: boolean, value: string) => void;
}

export default function Email({ onEmail }: PropsType) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  let timer: NodeJS.Timeout;

  useEffect(() => {
    if (showCodeInput && minutes === 0 && seconds === 0) {
      alert("인증 시간이 종료되었습니다. 다시 인증을 요청해 주세요.");
      setShowCodeInput(false);
    } else if (showCodeInput) {
      timer = setInterval(() => {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [minutes, seconds, showCodeInput]);

  const startTimer = () => {
    clearInterval(timer);
    setMinutes(10);
    setSeconds(0);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    VALIDATE.USER.EMAIL.test(e.target.value) ? setEmailValid(true) : setEmailValid(false);
  };

  const handleCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    VALIDATE.USER.CODE.test(e.target.value) ? setCodeValid(true) : setCodeValid(false);
  };

  const sendCode = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("post", "/auth/send-verification-code", {
        email,
      });
      console.log(response);
      if (response.status === STATUS_CODE.CREATED) {
        setCodeValid(true);
        setConfirm(false);
        setCode("");
        setShowCodeInput(true);
        alert("인증번호가 전송되었습니다!");
        startTimer();
      }
    } catch (error) {
      console.error("인증코드 전송 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
      setEmail("");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("post", "/auth/verify-code", {
        email,
        code,
      });

      if (response.status === STATUS_CODE.CREATED) {
        alert("인증되었습니다!");
        clearInterval(timer);
        setConfirm(true);
      }
    } catch (error) {
      console.error("인증코드 확인 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
      setCode("");
    }
  };

  useEffect(() => {
    onEmail(confirm, email);
  }, [confirm, email]);

  return (
    <>
      <InputGroup>
        <Label id="email">이메일</Label>
        <InputGroup>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleEmail}
            value={email}
            warning={!emailValid && email}
          />
          {!emailValid && email && <ErrorMessage>{MESSAGE.LOGIN.SYNTAX_EMAIL}</ErrorMessage>}
          <SmallBtnGroup>
            <Button
              variant="confirm"
              shape="small"
              size="smallWithXsFont"
              disabled={!emailValid || !email}
              onClick={sendCode}
            >
              인증 요청
            </Button>
          </SmallBtnGroup>
        </InputGroup>
        {showCodeInput && (
          <InputGroup $marginTop={8}>
            <Input
              id="verifyCode"
              type="text"
              name="verifyCode"
              placeholder="인증번호 입력"
              onChange={handleCode}
              value={code}
              warning={!codeValid && code}
              disabled={confirm}
            />
            {!codeValid && code && <ErrorMessage>{MESSAGE.JOIN.SYNTAX_CODE}</ErrorMessage>}
            <SmallBtnGroup>
              <Timer>{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}</Timer>
              <Button
                variant="confirm"
                shape="small"
                size="smallWithXsFont"
                disabled={!codeValid || confirm}
                onClick={verifyCode}
              >
                인증확인
              </Button>
            </SmallBtnGroup>
          </InputGroup>
        )}
      </InputGroup>
    </>
  );
}
