import { ChangeEvent } from "react";
import * as S from "./index.styled";

interface InputType {
  type: string;
  name: string;
  id: string;
  label: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type PartialInput = {
  [key in keyof InputType]?: InputType[key];
};

export default function Input({ type, name, id, label, placeholder, handleChange }: PartialInput) {
  return (
    <>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      <S.Input type={type} id={id} name={name} placeholder={placeholder} onChange={handleChange} />
    </>
  );
}
