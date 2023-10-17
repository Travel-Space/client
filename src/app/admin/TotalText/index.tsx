import * as S from "./index.styled";

type TotalTextProps = {
  titleText: string;
  totalNum: number;
  unit: string;
};

export default function TotalText({ titleText, totalNum, unit }: TotalTextProps) {
  return (
    <S.Container>
      <p>
        전체 {titleText} <span>{totalNum}</span>
        {unit}
      </p>
    </S.Container>
  );
}
