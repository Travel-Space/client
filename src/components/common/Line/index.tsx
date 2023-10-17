import * as S from "./index.styled";

export interface colorProp {
  color: "gray" | "white";
  size: "vertical" | "horizontal";
}

export default function Line({ color, size }: colorProp) {
  return <S.Line color={color} size={size} />;
}
