import axiosRequest from "@/api";
import { ResData, Posting } from "@/@types";

import { useState, useEffect } from "react";

import * as S from "./index.styled";

import PostItem from "./PostItem";
import Nothing from "@/components/common/Nothing";

const PopularPost = ({ planetId }: { planetId: number }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const [posts, setPosts] = useState<Posting[]>([]);
  posts.sort((a, b) => b.monthlyViews - a.monthlyViews);

  //월간 게시글 랭킹 조회
  const getPopularPost = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>(
        "get",
        `/articles/${planetId}/top-articles?year=${currentYear}&month=${currentMonth}`,
      );
      setPosts(response.data);
      // console.log("viewcount", response.data);
    } catch (error) {
      alert("인기글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet popular post data: ", error);
    }
  };

  useEffect(() => {
    getPopularPost();
  }, [planetId]);

  return (
    <>
      {posts?.length === 0 ? (
        <>
          <S.Title>인기글</S.Title>
          <Nothing
            src="/assets/img/icons/no-postings.svg"
            alt="no-postings"
            width={96}
            height={96}
            comment="인기글이 없습니다."
            suggest="게시글을 작성해 보세요."
            font="lg"
          />
        </>
      ) : (
        <S.Table>
          <S.TableHeader>
            <tr>
              <S.TdTitle>
                <div>인기글</div>
              </S.TdTitle>
              <S.TdLeft></S.TdLeft>
              <S.TdCenter>월간 조회수</S.TdCenter>
              <S.TdCenter>작성일</S.TdCenter>
            </tr>
          </S.TableHeader>
          <S.Tablebody>
            {posts.map((post, idx) => (
              <PostItem key={`popularPost${idx}`} ranking={idx + 1} data={post} />
            ))}
          </S.Tablebody>
        </S.Table>
      )}
    </>
  );
};

export default PopularPost;
