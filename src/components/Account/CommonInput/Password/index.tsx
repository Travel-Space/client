import { useEffect, useState } from "react";
import MESSAGE from "@/constants/message";

import Input, { Label } from "@/components/common/Input";

import { Error, InputGroup } from "../../index.styled";

interface PropsType {
  onPasswordCompare: (result: boolean, value: string) => void;
  valid: boolean;
}

export default function Password({ onPasswordCompare, valid }: PropsType) {
  const [input, setInput] = useState({ password: "", passwordCheck: "" });
  const { password, passwordCheck } = input;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value,
    }));
  }

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
        {valid && <Error>{MESSAGE.LOGIN.SYNTAX_PASSWORD}</Error>}
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
          warning={password !== passwordCheck && passwordCheck.length > 0}
        />
        {password !== passwordCheck && passwordCheck.length > 0 && <Error>{MESSAGE.JOIN.SYNTAX_PASSWORD_CHECK}</Error>}
      </InputGroup>
    </>
  );
}
