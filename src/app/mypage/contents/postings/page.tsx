"use client";
import { useState } from "react";
import * as S from "./page.styled";

import Nothing from "@/app/mypage/Nothing";
import MyPostings from "./MyPostings";
import SearchForm from "@/app/mypage/SearchForm";

import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { Posting } from "@/@types/Posting";

export default function Postings() {
  //드롭다운 데이터
  const [selectedMenu, setSelectedMenu] = useState("글 제목");
  const dropDownProps = {
    menuList: ["글 제목", "행성 이름"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
    placeholder: "글 관리에서 검색합니다.",
  };

  //게시글 불러오기
  const fetchArticles = async () => {
    return axios.get("/articles/my-articles").then(response => response.data);
  };

  const { isLoading, data, isError, error } = useQuery<Posting[], Error, Posting[]>({
    queryKey: ["get-articles"],
    queryFn: fetchArticles,
  });
  console.log("data", data);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  return (
    <S.Container>
      <Nothing
        src="/assets/img/icons/no-postings.svg"
        alt="no-postings"
        width={96}
        height={96}
        comment="작성된 게시글이 없습니다."
      />
      <S.Header>
        <S.PostingsNumber>
          총 <span>{data && data.length}</span>개의 게시글
        </S.PostingsNumber>
        <SearchForm select={dropDownProps} />
      </S.Header>
      <S.MyPostingsWrap>{data && data.map(posting => <MyPostings data={posting} />)}</S.MyPostingsWrap>
      <ReactQueryDevtools initialIsOpen={false} />
    </S.Container>
  );
}
