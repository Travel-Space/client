import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import VALIDATE from "@/constants/regex";
import MESSAGE from "@/constants/message";

import Input, { Label } from "@/components/common/Input";
import Button from "@/components/common/Button";

import { Error, InputGroup, SmallBtnGroup } from "../../index.styled";

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

  const regexEmail = new RegExp(VALIDATE.email);
  const regexNumber = new RegExp(VALIDATE.onlyNumber);

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    regexEmail.test(email) ? setEmailValid(true) : setEmailValid(false);
  }

  function handleCode(e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value);
    regexNumber.test(code) ? setCodeValid(true) : setCodeValid(false);
  }

  async function sendCode() {
    setShowCodeInput(true);
    try {
      const response = await axios.post("/auth/send-verification-code", {
        email,
      });
      response.data.success && alert("인증번호가 전송되었습니다!");
    } catch (error) {
      // console.error("인증코드 전송 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  async function verifyCode() {
    try {
      const response = await axios.post("/auth/verify-code", {
        email,
        code,
      });
      response.data.success && alert("인증되었습니다!");
      return setConfirm(true);
    } catch (error) {
      // console.error("인증코드 전송 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
      return setCode("");
    }
  }

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
            warning={!emailValid && email.length > 0}
          />
          {!emailValid && email.length > 0 && <Error>{MESSAGE.LOGIN.SYNTAX_EMAIL}</Error>}
          <SmallBtnGroup>
            <Button variant="confirm" shape="small" size="smallWithXsFont" disabled={!emailValid} onClick={sendCode}>
              인증요청
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
              warning={!codeValid && code.length > 0}
              disabled={confirm}
            />
            {!codeValid && code.length > 0 && <Error>{MESSAGE.JOIN.SYNTAX_CODE}</Error>}
            <SmallBtnGroup>
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
