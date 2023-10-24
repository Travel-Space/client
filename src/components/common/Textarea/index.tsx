import { ReactEventHandler } from "react";
import * as S from "./index.styled";

export interface sizeProp {
  size: "spaceShip" | "declaration" | "admin" | "post" | "comment" | "planet";
}

export interface TextareaProp extends sizeProp {
  name: string;
  placeholder: string;
  maxLength: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({ size, placeholder, name, maxLength, onChange }: TextareaProp) {
  return <S.Textarea size={size} placeholder={placeholder} maxLength={maxLength} name={name} onChange={onChange} />;
}
