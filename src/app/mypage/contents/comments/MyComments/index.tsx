import axiosRequest from "@/api";
import { ResData, Comment, Comments } from "@/@types";

import { useRouter } from "next/navigation";

import * as S from "./index.styled";

import Button from "@/components/common/Button";

import { getDateInfo } from "@/utils/getDateInfo";

interface MyCommentsProps {
  page: number;
  setPage: (page: number) => void;
  data: Comment;
  saveData: (totalCount: number, totalPage: number, comments: Comment[]) => void;
}

export default function MyComments({ page, data, setPage, saveData }: MyCommentsProps) {
  const { article, articleId, content, id } = data;

  const router = useRouter();

  const goToPlanet = () => {
    router.push(`/planet/${article.planetId}/map/`);
  };
  const goToPost = () => {
    router.push(`/planet/${article.planetId}/post/?detail=${articleId}`);
  };

  //UTC->LOCAL 날짜 변환
  const { dateString, dayName } = getDateInfo(article.createdAt);

  //댓글 불러오기
  async function getComments() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Comments>>(
        "get",
        `/comments/user?page=${page}&limit=10`,
      );
      const comments = response.data.data;
      const totalCount = response.data.totalCount;
      const totalPage = Math.ceil(totalCount / 10);
      saveData(totalCount, totalPage, comments);
      // console.log("comments", response.data);

      //데이터가 1개 남았을 때 삭제시 이전 페이지로 전환
      comments.length === 0 && page !== 1 && setPage(prev => prev - 1);
    } catch (error) {
      alert("댓글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching comment data: ", error);
    }
  }

  //댓글 삭제
  async function deleteComment() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Comment>>("delete", `/comments/${id}`);
      // console.log("postings", postings);
    } catch (error) {
      alert("좋아요 취소 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }

  const handleDelete = async () => {
    await deleteComment();
    getComments();
  };

  return (
    <S.Container>
      <S.InfoRow>
        <S.InfoRowCol>
          <S.Planet onClick={goToPlanet}>{article.planet.name}</S.Planet>
          <S.Title onClick={goToPost}>{article.title}</S.Title>
        </S.InfoRowCol>
        <S.CreatedDate>{` ${dateString}
           ${dayName}`}</S.CreatedDate>
      </S.InfoRow>
      <S.InfoRow>
        <S.Comment>{content}</S.Comment>
        <S.Buttons>
          <Button variant="reverse" shape="medium" size="smallWithXsFont" onClick={goToPost}>
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
