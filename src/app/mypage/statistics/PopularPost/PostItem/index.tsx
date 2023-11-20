import { Posting } from "@/@types";

import { useRouter } from "next/navigation";

import * as S from "./index.styled";

import { getDateFormatWithDay } from "@/utils/getDateFormat";

interface PostItemProps {
  ranking: number;
  data: Posting;
}
export default function PostItem({ ranking, data }: PostItemProps) {
  const formattedDate = getDateFormatWithDay(data.createdAt).slice(0, 10);

  const router = useRouter();

  const goToPost = () => {
    router.push(`/planet/${data.planetId}/post/?detail=${data.id}`);
  };

  return (
    <S.TableRow>
      <S.Ranking>{ranking}</S.Ranking>
      <S.TdLeft>
        <S.PostTitle onClick={goToPost}>{data.title}</S.PostTitle>
      </S.TdLeft>
      <S.TdCenter>{data.monthlyViews}</S.TdCenter>
      <S.TdCenter>{formattedDate}</S.TdCenter>
    </S.TableRow>
  );
}
