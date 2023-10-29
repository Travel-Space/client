import { Comment } from "@/@types";

import * as S from "./index.styled";

import Button from "@/components/common/Button";

import { getDateInfo } from "@/utils/getDateInfo";

interface MyCommentsProps {
  data: Comment;
}

export default function MyComments({ data }: MyCommentsProps) {
  const { id, content, createdAt } = data;

  //UTC->LOCAL 날짜 변환
  const { dateString, dayName } = getDateInfo(createdAt);
  const handleClick = () => {
    console.log();
  };
  return (
    <S.Container>
      <S.InfoRow>
        <S.InfoRowCol>
          {/* 스키마 추가 시 수정예정 */}
          <S.Planet>지구지구행성</S.Planet>
          <S.Title>글제목</S.Title>
        </S.InfoRowCol>
        <S.CreatedDate>{` ${dateString}
           ${dayName}`}</S.CreatedDate>
      </S.InfoRow>
      <S.InfoRow>
        <S.Comment>{content}</S.Comment>
        <S.Buttons>
          <Button variant="reverse" shape="medium" size="smallWithXsFont" onClick={handleClick}>
            수정
          </Button>
          <Button variant="error" shape="medium" size="smallWithXsFont" onClick={handleClick}>
            삭제
          </Button>
        </S.Buttons>
      </S.InfoRow>
    </S.Container>
  );
}
