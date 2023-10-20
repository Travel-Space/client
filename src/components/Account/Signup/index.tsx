import Button from "@/components/common/Button";
import Basic from "./Basic";
import Social from "./Social";
import * as S from "./index.styled";

// 소셜 최초 가입 - 이름, 닉네임, 국적
// 일반 가입 - 이름, 닉네임, 이메일, 이메일인증, 비밀번호, 비밀번호 확인, 국적

export default function Signup() {
  return (
    <S.Wrap>
      {/* 소셜 최초 가입(이름, 닉네임, 국적) */}
      <Social />
      {/* 일반 가입일 경우 노출(이메일, 이메일인증, 비밀번호, 비밀번호 확인) */}
      <Basic />
      <Button variant="confirm" shape="medium" size="big">
        Sign Up
      </Button>
    </S.Wrap>
  );
}
