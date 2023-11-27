"use client";
import axiosRequest from "@/api";
import { ResData, Posting, PostingsType, SearchItem } from "@/@types";

import { useState, useEffect } from "react";

import * as S from "./page.styled";

import Nothing from "@/components/common/Nothing";
import SearchForm from "@/app/mypage/SearchForm";
import PostingItem from "@/components/common/User/PostingItem";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";

import MESSAGE from "@/constants/message";

export default function FavoritePostings() {
  const dropDownProps = {
    selectedMenu: "글 제목",
    placeholder: "글 제목으로 검색해 보세요.",
  };

  const [searchItem, setSearchItem] = useState<SearchItem>();

  const [postings, setPostings] = useState<Posting[]>([]);

  const handleSearch = (item: SearchItem) => {
    setSearchItem(item);
    // console.log("searchItem", item);
  };

  //좋아요한 게시글 불러오기
  const getPostings = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PostingsType>>(
        "get",
        !searchItem?.content
          ? `/articles/my/likes?page=${page}&limit=10`
          : `/articles/my/likes?page=${page}&limit=10&${searchItem.selectedMenu}=${searchItem.content}`,
      );
      const postings = response.data.data;
      const totalCount = response.data.totalCount;
      const totalPage = Math.ceil(totalCount / 10);
      saveData(totalCount, totalPage, postings);
      // console.log("comments", response.data);
    } catch (error) {
      console.error("게시글 정보를 불러오는 중 오류가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  //pagination
  const { saveData, totalCount, totalPage, page, setPage } = usePagination(getPostings, setPostings);

  useEffect(() => {
    getPostings();
  }, []);

  useEffect(() => {
    setPage(1);
    getPostings();
  }, [searchItem]);

  return (
    <S.Container>
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
        <>
          <S.Header>
            <S.PostNumber>
              총 <span>{totalCount}</span>개의 게시글
            </S.PostNumber>
            <SearchForm select={dropDownProps} onSearch={handleSearch} />
          </S.Header>

          <S.Postings>
            {postings?.map((el, idx) => (
              <PostingItem key={`liked-post${idx}`} data={el} page={page} saveData={saveData} setPage={setPage} />
            ))}
          </S.Postings>
          <Pagination totalPage={totalPage} limit={5} page={page} setPage={setPage} />
        </>
      )}
    </S.Container>
  );
}
