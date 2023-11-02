import axiosRequest from "@/api";
import { ResData, Posting, Postings } from "@/@types";

import { useRecoilState } from "recoil";
import myPostingsState from "@/recoil/atoms/myPostings.atom";

import * as S from "./index.styled";

import Image from "next/image";
import Button from "@/components/common/Button";

import { getDateInfo } from "@/utils/getDateInfo";

interface MyPostingsProps {
  page: number;
  data: Posting;
  saveData: (totalCount: number, totalPage: number) => void;
}
export default function MyPostings({ page, data, saveData }: MyPostingsProps) {
  const { id, title, planet, createdAt, likes } = data;

  //UTC->LOCAL 날짜 변환
  const { dateString, dayName } = getDateInfo(createdAt);

  const [_, setPostings] = useRecoilState<Posting[]>(myPostingsState);

  const handleClickEditBtn = () => {
    console.log();
  };
  const handleClickDeleteBtn = async (id: number) => {
    await deletePosting(id);
    getPostings();
  };

  // 내 게시글 삭제
  async function deletePosting(id: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("delete", `/articles/${id}`);
    } catch (error) {
      alert("게시글 정보를 삭제 하는 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }

  //게시글 조회
  async function getPostings() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Postings>>(
        "get",
        `/articles/my/articles?page=${page}&limit=10`,
      );
      const postings = response.data.data;
      const totalCount = response.data.totalCount;
      const totalPage = Math.ceil(totalCount / 10);
      setPostings(postings);
      saveData(totalCount, totalPage);
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
