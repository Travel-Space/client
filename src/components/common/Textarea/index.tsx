import * as S from "./index.styled";

export interface sizeProp {
  size: "spaceShip" | "declaration" | "admin" | "post" | "comment";
}

export interface TextareaProp extends sizeProp {
  name: string;
  placeholder: string;
  maxLength: number;
}

export default function Textarea({ size, placeholder, name, maxLength }: TextareaProp) {
  return <S.Textarea size={size} placeholder={placeholder} maxLength={maxLength} name={name} />;
}
