import Input, { Label } from "@/components/common/Input";
import { Error, InputGroup } from "../../index.styled";
import { useEffect, useState } from "react";

interface PropsType {
  onPasswordCompare: (result: boolean, password: string) => void;
}

export default function Password({ onPasswordCompare }: PropsType) {
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
          warning={password !== "" && password.length < 6}
        />
        {password && <Error>{password.length < 6 && "6글자 이상으로 입력해주세요."}</Error>}
      </InputGroup>
      <InputGroup>
        <Label id="passwordCheck">비밀번호 확인</Label>
        <Input
          id="passwordCheck"
          type="password"
          name="passwordCheck"
          placeholder="Password Check"
          onChange={handleChange}
          warning={password !== passwordCheck}
        />
        {passwordCheck && <Error>{password !== passwordCheck && "비밀번호가 일치하지 않습니다."}</Error>}
      </InputGroup>
    </>
  );
}
