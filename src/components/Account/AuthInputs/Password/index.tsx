import { useEffect, useState } from "react";
import MESSAGE from "@/constants/message";

import Input, { Label } from "@/components/common/Input";

import { InputGroup } from "@/components/Account/index.styled";
import { ErrorMessage } from "@/styles/common";

interface PropsType {
  onPasswordCompare: (result: boolean, value: string) => void;
  valid: boolean | string;
}

export default function Password({ onPasswordCompare, valid }: PropsType) {
  const [input, setInput] = useState({ password: "", passwordCheck: "" });
  const { password, passwordCheck } = input;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    onPasswordCompare(password === passwordCheck, password);
  }, [password, passwordCheck]);

  return (
    <>
      <InputGroup>
        <Label id="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          warning={valid}
          value={password}
        />
        {valid && <ErrorMessage>{MESSAGE.LOGIN.SYNTAX_PASSWORD}</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label id="passwordCheck">비밀번호 확인</Label>
        <Input
          id="passwordCheck"
          type="password"
          name="passwordCheck"
          placeholder="Password Check"
          onChange={handleChange}
          value={passwordCheck}
          warning={password !== passwordCheck && passwordCheck}
        />
        {password !== passwordCheck && passwordCheck && (
          <ErrorMessage>{MESSAGE.JOIN.SYNTAX_PASSWORD_CHECK}</ErrorMessage>
        )}
      </InputGroup>
    </>
  );
}
