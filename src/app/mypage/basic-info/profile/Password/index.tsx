import { useState, useEffect } from "react";

import * as S from "./index.styled";

import Input from "@/components/common/Input";
import Line from "@/components/common/Line";
import Item from "../Item";
import MESSAGE from "@/constants/message";

interface PropsType {
  onPasswordCompare: (result: boolean, value: string) => void;
  valid: boolean;
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
    <S.Container>
      <Item name="새 비밀번호">
        <S.InputGroup>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            warning={valid}
            value={password}
          />
          {valid && <S.Error>{MESSAGE.LOGIN.SYNTAX_PASSWORD}</S.Error>}
        </S.InputGroup>
      </Item>
      <Line color="gray" size="horizontal" />
      <Item name="새 비밀번호 확인">
        <S.InputGroup>
          <Input
            id="passwordCheck"
            type="password"
            name="passwordCheck"
            placeholder="Password Check"
            onChange={handleChange}
            value={passwordCheck}
            warning={password !== passwordCheck && passwordCheck.length > 0}
          />
          {password !== passwordCheck && passwordCheck.length > 0 && (
            <S.Error>{MESSAGE.JOIN.SYNTAX_PASSWORD_CHECK}</S.Error>
          )}
        </S.InputGroup>
      </Item>
    </S.Container>
  );
}
