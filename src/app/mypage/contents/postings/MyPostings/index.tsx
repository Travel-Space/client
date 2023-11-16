import axiosRequest from "@/api";
import { ResData, Posting, PostingsType } from "@/@types";

import { useRouter } from "next/navigation";

import * as S from "./index.styled";

import Image from "next/image";
import Button from "@/components/common/Button";

import { getDateInfo } from "@/utils/getDateInfo";

interface MyPostingsProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: Posting;
  saveData: (totalCount: number, totalPage: number, post: Posting[]) => void;
}
export default function MyPostings({ page, data, setPage, saveData }: MyPostingsProps) {
  const { id, title, planet, createdAt, likes } = data;

  //UTC->LOCAL 날짜 변환
  const { dateString, dayName } = getDateInfo(createdAt);

  const router = useRouter();

  const handleEdit = () => {
    router.push(`/planet/${planet.id}/post/write/?id=${id}&isEdit=true`);
  };
  const goToPlanet = () => {
    router.push(`/planet/${data.planetId}/map/`);
  };
  const goToPost = () => {
    router.push(`/planet/${data.planetId}/post/?detail=${data.id}`);
  };

  const handleDelete = async () => {
    await deletePosting();
    getPostings();
  };

  // 내 게시글 삭제
  async function deletePosting() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("delete", `/articles/${id}`);
      // console.log("deletePost", response);
    } catch (error) {
      alert("게시글 정보를 삭제 하는 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }

  //게시글 조회
  async function getPostings() {
    try {
      const response = await axiosRequest.requestAxios<ResData<PostingsType>>(
        "get",
        `/articles/my/articles?page=${page}&limit=10`,
      );
      const postings = response.data.data;
      const totalCount = response.data.totalCount;
      const totalPage = Math.ceil(totalCount / 10);
      saveData(totalCount, totalPage, postings);

      //데이터가 1개 남았을 때 삭제시 이전 페이지로 전환
      postings.length === 0 && page !== 1 && setPage(prev => prev - 1);
      // console.log("postings", postings);
    } catch (error) {
      alert("게시글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }

  return (
    <S.Container>
      <S.InfoRow>
        <S.InfoRowCol>
          <S.Planet onClick={goToPlanet}>{planet.name}</S.Planet>
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
        <S.Title onClick={goToPost}>{title}</S.Title>
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
