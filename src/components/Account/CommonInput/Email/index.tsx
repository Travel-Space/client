import Input, { Label } from "@/components/common/Input";
import { Error, InputGroup, SmallBtnGroup } from "../../index.styled";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import VALIDATE from "@/constants/regex";
import axios from "axios";

interface PropsType {
  onEmail: (email: string) => void;
}

export default function Email({ onEmail }: PropsType) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isDisabled, setIsDisabled] = useState({
    sendCode: true,
    confirmCode: true,
    finishInput: false,
  });
  const [isSend, setIsSend] = useState(false);

  const regexEmail = new RegExp(VALIDATE.email);
  const regexNumber = new RegExp(VALIDATE.onlyNumber);

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleCode(e: React.ChangeEvent<HTMLInputElement>) {
    setCode(e.target.value.replace(regexNumber, ""));
  }

  async function sendVerify() {
    try {
      setIsSend(true);
      const sendCode = await axios.post("/auth/send-verification-code", {
        email,
      });
      sendCode.data.success && alert("인증번호가 전송되었습니다!");
      setIsDisabled(prev => ({
        ...prev,
        finishInput: false,
        confirmCode: false,
      }));
      setCode("");
    } catch (error) {
      console.error("인증코드 전송 에러", error);
    }
  }

  async function confirmVerify() {
    try {
      setIsSend(true);
      const confirmCode = await axios.post("/auth/verify-code", {
        email,
        code,
      });
      confirmCode.data.success && alert("인증되었습니다!");
      setIsDisabled(prev => ({
        ...prev,
        finishInput: true,
        confirmCode: true,
      }));
    } catch (error) {
      console.error("인증코드 확인 에러", error);
      alert("유효하지 않은 인증코드입니다.");
      setCode("");
    }
  }

  useEffect(() => {
    setIsDisabled(prev => ({
      ...prev,
      sendCode: !regexEmail.test(email),
      confirmCode: !code,
    }));
    onEmail(email);
  }, [email, code]);

  return (
    <>
      <InputGroup>
        <Label id="email">이메일</Label>
        <InputGroup $marginBottom={8}>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleEmail}
            warning={email !== "" && isDisabled.sendCode}
          />
          {email && <Error>{isDisabled.sendCode && "이메일 형식에 맞게 입력해주세요."}</Error>}
          <SmallBtnGroup>
            <Button
              variant="confirm"
              shape="small"
              size="smallWithXsFont"
              onClick={sendVerify}
              disabled={isDisabled.sendCode}
            >
              인증요청
            </Button>
          </SmallBtnGroup>
        </InputGroup>
        {isSend && (
          <InputGroup>
            <Input
              id="verifyCode"
              type="text"
              name="verifyCode"
              value={code}
              placeholder="인증번호 입력"
              onChange={handleCode}
              disabled={isDisabled.finishInput}
            />
            <SmallBtnGroup>
              <Button
                variant="confirm"
                shape="small"
                size="smallWithXsFont"
                disabled={isDisabled.confirmCode}
                onClick={confirmVerify}
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
