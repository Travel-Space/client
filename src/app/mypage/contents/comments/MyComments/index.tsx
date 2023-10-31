import axiosRequest from "@/api";
import { ResData, Comment } from "@/@types";

import * as S from "./index.styled";

import Button from "@/components/common/Button";

import { getDateInfo } from "@/utils/getDateInfo";

interface MyCommentsProps {
  data: Comment;
  setComments: (comments: Comment[]) => void;
}

export default function MyComments({ data, setComments }: MyCommentsProps) {
  const { article, content, id } = data;

  //댓글 불러오기
  //페이지네이션 추후 적용 - 수정예정
  async function getComments() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Comment[]>>("get", `/comments/user`);
      const comments = response.data;
      setComments(comments);
      console.log("comments", comments);
    } catch (error) {
      alert("게시글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }

  async function deleteComment() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Comment>>("delete", `/comments/${id}`);
      // console.log("postings", postings);
    } catch (error) {
      alert("좋아요 취소 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }
  //UTC->LOCAL 날짜 변환
  const { dateString, dayName } = getDateInfo(article.createdAt);
  const handleDelete = async () => {
    await deleteComment();
    getComments();
  };
  const handleEdit = () => {
    console.log();
  };
  return (
    <S.Container>
      <S.InfoRow>
        <S.InfoRowCol>
          <S.Planet>{article.planet.name}</S.Planet>
          <S.Title>{article.title}</S.Title>
        </S.InfoRowCol>
        <S.CreatedDate>{` ${dateString}
           ${dayName}`}</S.CreatedDate>
      </S.InfoRow>
      <S.InfoRow>
        <S.Comment>{content}</S.Comment>
        <S.Buttons>
          <Button variant="reverse" shape="medium" size="smallWithXsFont" onClick={handleEdit}>
            수정
          </Button>
          <Button variant="error" shape="medium" size="smallWithXsFont" onClick={handleDelete}>
            삭제
          </Button>
        </S.Buttons>
      </S.InfoRow>
    </S.Container>
  );
}
