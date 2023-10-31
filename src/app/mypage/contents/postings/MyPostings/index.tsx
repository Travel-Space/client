import axiosRequest from "@/api";
import { ResData, Posting } from "@/@types";

import { useRecoilState } from "recoil";
import myPostingsState from "@/recoil/atoms/myPostings.atom";

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

  const handleClickEditBtn = () => {
    console.log();
  };
  const handleClickDeleteBtn = async (id: number) => {
    await deletePosting(id);
    getPostings();
  };

  // 내 게시글 삭제
  //response로 게시글 주세요 현규님 - 수정예정
  const [postings, setPostings] = useRecoilState(myPostingsState);
  async function deletePosting(id: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("delete", `/articles/${id}`);
      const postings = response.data;
      // setPostings(postings);
      console.log("postings", postings);
    } catch (error) {
      alert("게시글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }
  //게시글 불러오기
  async function getPostings() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("get", `/articles/my/articles`);
      const postings = response.data;
      setPostings(postings);
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
          <Button variant="reverse" shape="medium" size="smallWithXsFont" onClick={handleClickEditBtn}>
            수정
          </Button>
          <Button variant="error" shape="medium" size="smallWithXsFont" onClick={() => handleClickDeleteBtn(id)}>
            삭제
          </Button>
        </S.Buttons>
      </S.InfoRow>
    </S.Container>
  );
}
