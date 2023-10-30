import axios from "axios";
import { Posting } from "@/@types/Posting";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as S from "./index.styled";

import Image from "next/image";
import Button from "@/components/common/Button";

import { getDateInfo } from "@/utils/getDateInfo";

interface MyPostingsProps {
  data: Posting;
}
export default function MyPostings({ data }: MyPostingsProps) {
  const { id, title, planet, createdAt, likes } = data;

  //UTC->LOCAL 날짜 변환
  const { dateString, dayName } = getDateInfo(createdAt);

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
        <S.CreatedDate>{` ${dateString}
           ${dayName}`}</S.CreatedDate>
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
