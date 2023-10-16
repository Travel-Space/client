import * as S from "./index.styled";

export interface colorProp {
  color: "gray" | "white";
}

export default function Line({ color }: colorProp) {
  return <S.Line color={color} />;
}
