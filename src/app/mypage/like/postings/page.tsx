"use client";
import axiosRequest from "@/api";
import { ResData, Posting } from "@/@types";

import { useState, useEffect } from "react";

import * as S from "./page.styled";

import Nothing from "@/components/common/Nothing";
import SearchForm from "@/app/mypage/SearchForm";
import PostingItem from "@/components/User/PostingItem";

export default function FavoritePostings() {
  const dropDownProps = {
    placeholder: "글 제목으로 검색해보세요.",
  };

  const [postings, setPostings] = useState<Posting[]>([]);
  //게시글 불러오기
  async function getPostings() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("get", `/articles/my/likes`);
      const postings = response.data;
      setPostings(postings);
      // console.log("postings", postings);
    } catch (error) {
      alert("게시글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }

  useEffect(() => {
    getPostings();
  }, []);
  return (
    <S.Container>
      <S.Header>
        <S.CommentsNumber>
          총 <span>{postings.length}</span>개의 게시글
        </S.CommentsNumber>
        <SearchForm select={dropDownProps} />
      </S.Header>
      {postings.length === 0 ? (
        <Nothing
          src="/assets/img/icons/no-postings.svg"
          alt="no-postings"
          width={96}
          height={96}
          comment="좋아하는 게시글이 없습니다."
          font="lg"
        />
      ) : (
        <S.Postings>
          {postings.map((el, idx) => (
            <PostingItem
              key={`liked-post${idx}`}
              data={el}
              setPostings={(postings: Posting[]) => setPostings(postings)}
            />
          ))}
        </S.Postings>
      )}
    </S.Container>
  );
}
