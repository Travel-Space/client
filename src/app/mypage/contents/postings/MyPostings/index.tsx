import WEEKDAY from "@/constants/weekDay";
import Image from "next/image";

import * as S from "./index.styled";

import Button from "@/components/common/Button";
import { Posting } from "@/@types/Posting";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface MyPostingsProps {
  data: Posting;
}
export default function MyPostings({ data }: MyPostingsProps) {
  const { id, title, planet, createdAt, likes } = data;

  //UTC->LOCAL 날짜 변환
  const FormatDate = (createdAt: Date) => {
    const localDate = new Date(createdAt);
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const date = localDate.getDate();
    const day = WEEKDAY[localDate.getDay()];
    return `${year}년 ${month}월 ${date}일 ${day}`;
  };
  const handleClick = () => {
    console.log();
  };

  //게시글 삭제
  const deletePosting = async (id: number) => {
    return await axios.delete(`/articles/${id}`);
  };
  const queryClient = useQueryClient();
  const { mutate: deletePostingMutation } = useMutation({
    mutationFn: deletePosting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-articles"] });
    },
  });

  return (
    <S.Container>
      <S.InfoRow>
        <S.InfoRowCol>
          <S.Planet>{planet.name}</S.Planet>
          <S.Likes>
            <S.Heart>
              <Image src="/assets/img/icons/red-heart.svg" alt="likes" width={10} height={8.61} />
            </S.Heart>
            <span>{likes.length}</span>
          </S.Likes>
        </S.InfoRowCol>
        <S.CreatedDate>{FormatDate(createdAt)}</S.CreatedDate>
      </S.InfoRow>
      <S.InfoRow>
        <S.Title>{title}</S.Title>
        <S.Buttons>
          <Button variant="reverse" shape="medium" size="smallWithXsFont" onClick={handleClick}>
            수정
          </Button>
          <Button variant="error" shape="medium" size="smallWithXsFont" onClick={() => deletePostingMutation(id)}>
            삭제
          </Button>
        </S.Buttons>
      </S.InfoRow>
    </S.Container>
  );
}
