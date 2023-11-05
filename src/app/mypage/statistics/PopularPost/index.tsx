import axiosRequest from "@/api";
import { ResData, Posting } from "@/@types";

import * as S from "./index.styled";

import PostItem from "./PostItem";
import { useEffect } from "react";

export default function PopularPost({ planetId }: { planetId: number }) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  //월간 게시글 랭킹 조회

  async function getPopularPost() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>(
        "get",
        `/articles/${planetId}/top-articles?year=${currentYear}&month=${currentMonth}`,
      );
      // setViewData(response.data);
      // console.log("viewcount", response.data);
    } catch (error) {
      alert("인기글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet popular post data: ", error);
    }
  }

  useEffect(() => {
    getPopularPost();
  }, [planetId]);

  return (
    <S.Table>
      <S.TableHeader>
        <tr>
          <S.TdTitle>
            <div>인기글</div>
          </S.TdTitle>
          <S.TdLeft></S.TdLeft>
          <S.TdCenter>월간 조회수</S.TdCenter>
          <S.TdCenter>행성</S.TdCenter>
          <S.TdCenter>작성일</S.TdCenter>
        </tr>
      </S.TableHeader>
      <S.Tablebody>
        <PostItem ranking={1} />
      </S.Tablebody>
    </S.Table>
  );
}
