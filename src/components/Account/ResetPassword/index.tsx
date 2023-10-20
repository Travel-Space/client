import Line from "@/components/common/Line";
import * as S from "./index.styled";
import Input, { Label } from "@/components/common/Input";
import Button from "@/components/common/Button";

export default function ResetPassword() {
  return (
    <S.Wrap>
      <S.InputGroup>
        <Label id="user-email">이메일</Label>
        <S.InputGroup $marginBottom={8}>
          <Input id="user-email" type="email" name="user-email" placeholder="Email" />
          <S.SmallBtnGroup>
            <Button variant="confirm" shape="small" size="smallWithXsFont">
              인증요청
            </Button>
          </S.SmallBtnGroup>
        </S.InputGroup>
        <S.InputGroup>
          <Input id="email-code" type="text" name="email-code" placeholder="인증번호 입력" />
          <S.SmallBtnGroup>
            <Button variant="confirm" shape="small" size="smallWithXsFont">
              인증확인
            </Button>
          </S.SmallBtnGroup>
        </S.InputGroup>
      </S.InputGroup>

      <S.MarginGroup>
        <Line size="horizontal" color="gray" />
      </S.MarginGroup>

      <S.InputGroup>
        <Label id="user-password">비밀번호</Label>
        <Input id="user-password" type="password" name="user-password" placeholder="Password" />
      </S.InputGroup>
      <S.InputGroup>
        <Label id="user-password-check">비밀번호 확인</Label>
        <Input id="user-password-check" type="password" name="user-password-check" placeholder="Password Check" />
      </S.InputGroup>

      <Button variant="confirm" shape="medium" size="big">
        Reset Password
      </Button>
    </S.Wrap>
  );
}
