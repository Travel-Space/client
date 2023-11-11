"use client";
import axiosRequest from "@/api";
import { ResData, Posting, PostingsType, SearchItem } from "@/@types";

import { useState, useEffect } from "react";

import * as S from "./page.styled";

import Nothing from "@/components/common/Nothing";
import MyPostings from "./MyPostings";
import SearchForm from "@/app/mypage/SearchForm";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import MESSAGE from "@/constants/message";

export default function Postings() {
  //드롭다운 데이터
  const [selectedMenu, setSelectedMenu] = useState("글 제목");
  const dropDownProps = {
    menuList: ["글 제목", "행성 이름"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
    placeholder: "글 관리에서 검색합니다.",
  };

  const [postings, setPostings] = useState<Posting[]>([]);

  const [searchItem, setSearchItem] = useState<SearchItem>();
  // const [searchedPosts, setSearchedPosts] = useState<Posting[]>([]);

  const handleSearch = (item: SearchItem) => {
    setSearchItem(item);
    // console.log("searchItem", item);
  };

  //pagination
  const { saveData, totalCount, totalPage, page, setPage } = usePagination(getPostings, setPostings);

  //게시글 불러오기
  async function getPostings() {
    try {
      const response = await axiosRequest.requestAxios<ResData<PostingsType>>(
        "get",
        !searchItem?.content
          ? `/articles/my/articles?page=${page}&limit=10`
          : `/articles/my/articles?page=${page}&limit=10&${searchItem?.selectedMenu}=${searchItem?.content}`,
      );
      const postings = response.data.data;
      const totalCount = response.data.totalCount;
      const totalPage = Math.ceil(totalCount / 10);
      saveData(totalCount, totalPage, postings);

      // console.log("postings", postings);
    } catch (error) {
      console.error("게시글 정보를 가져오는중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  }

  useEffect(() => {
    getPostings();
    // console.log("postings", postings);
  }, []);

  useEffect(() => {
    setPage(1);
    getPostings();
  }, [searchItem]);

  return (
    <S.Container>
      {totalCount === 0 ? (
        <Nothing
          src="/assets/img/icons/no-postings.svg"
          alt="no-postings"
          width={96}
          height={96}
          comment="작성된 게시글이 없습니다."
          font="lg"
        />
      ) : (
        <>
          <S.Header>
            <S.PostingsNumber>
              총 <span>{totalCount}</span>개의 게시글
            </S.PostingsNumber>
            <SearchForm select={dropDownProps} onSearch={handleSearch} />
          </S.Header>
          <S.MyPostingsWrap>
            {postings.map((el, idx) => (
              <MyPostings key={`my-posting${idx}`} data={el} page={page} saveData={saveData} setPage={setPage} />
            ))}
          </S.MyPostingsWrap>
          <Pagination totalPage={totalPage} limit={5} page={page} setPage={setPage} />
        </>
      )}
    </S.Container>
  );
}
