import Line from "@/components/common/Line";
import Input, { Label } from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Container, InputGroup, MarginGroup, SmallBtnGroup } from "../index.styled";

export default function ResetPassword() {
  return (
    <Container>
      <InputGroup>
        <Label id="user-email">이메일</Label>
        <InputGroup $marginBottom={8}>
          <Input id="user-email" type="email" name="user-email" placeholder="Email" />
          <SmallBtnGroup>
            <Button variant="confirm" shape="small" size="smallWithXsFont">
              인증요청
            </Button>
          </SmallBtnGroup>
        </InputGroup>
        <InputGroup>
          <Input id="email-code" type="text" name="email-code" placeholder="인증번호 입력" />
          <SmallBtnGroup>
            <Button variant="confirm" shape="small" size="smallWithXsFont">
              인증확인
            </Button>
          </SmallBtnGroup>
        </InputGroup>
      </InputGroup>

      <MarginGroup>
        <Line size="horizontal" color="gray" />
      </MarginGroup>

      <InputGroup>
        <Label id="user-password">비밀번호</Label>
        <Input id="user-password" type="password" name="user-password" placeholder="Password" />
      </InputGroup>
      <InputGroup>
        <Label id="user-password-check">비밀번호 확인</Label>
        <Input id="user-password-check" type="password" name="user-password-check" placeholder="Password Check" />
      </InputGroup>

      <Button variant="confirm" shape="medium" size="big">
        Reset Password
      </Button>
    </Container>
  );
}
