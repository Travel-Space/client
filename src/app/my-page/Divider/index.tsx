import * as S from "./index.styled";

interface DividerProps {
  width?: string;
  height?: string;
}
export default function Divider({ width, height }: DividerProps) {
  return <S.Container width={width} height={height}></S.Container>;
}
