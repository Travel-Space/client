import * as S from "./index.styled";

interface PopularPostingProps {
  ranking: number;
}
export default function PopularPosting({ ranking }: PopularPostingProps) {
  return (
    <S.TableRow>
      <S.Ranking>{ranking}</S.Ranking>
      <S.TdLeft>
        <div>일본여행 재밌음(제 1탄)</div>
      </S.TdLeft>
      <S.TdCenter>234</S.TdCenter>
      <S.TdCenter>일본 맛도리 여행</S.TdCenter>
      <S.TdCenter>2023.10.02</S.TdCenter>
    </S.TableRow>
  );
}
