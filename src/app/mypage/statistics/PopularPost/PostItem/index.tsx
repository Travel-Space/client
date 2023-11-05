import { Posting } from "@/@types";

import * as S from "./index.styled";

import { getDateFormatWithDay } from "@/utils/getDateFormat";

interface PostItemProps {
  ranking: number;
  data: Posting;
}
export default function PostItem({ ranking, data }: PostItemProps) {
  const formattedDate = getDateFormatWithDay(data.createdAt).slice(0, 10);

  return (
    <S.TableRow>
      <S.Ranking>{ranking}</S.Ranking>
      <S.TdLeft>
        <div>{data.title}</div>
      </S.TdLeft>
      <S.TdCenter>{data.monthlyViews}</S.TdCenter>
      <S.TdCenter>{formattedDate}</S.TdCenter>
    </S.TableRow>
  );
}
