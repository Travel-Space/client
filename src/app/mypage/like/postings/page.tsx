"use client";
import axiosRequest from "@/api";
import { ResData, Posting, PostingsType, SearchItem } from "@/@types";

import { useState, useEffect } from "react";

import * as S from "./page.styled";

import Nothing from "@/components/common/Nothing";
import SearchForm from "@/app/mypage/SearchForm";
import PostingItem from "@/components/User/PostingItem";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";

export default function FavoritePostings() {
  const dropDownProps = {
    selectedMenu: "글 제목",
    placeholder: "글 제목으로 검색해보세요.",
  };

  const [searchItem, setSearchItem] = useState<SearchItem>();

  const [postings, setPostings] = useState<Posting[]>([]);

  //pagination
  const { saveData, totalCount, totalPage, page, setPage } = usePagination(getPostings, setPostings);

  const handleSearch = (item: SearchItem) => {
    setSearchItem(item);
    // console.log("searchItem", item);
  };

  //좋아요한 게시글 불러오기
  async function getPostings() {
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
      alert("게시글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }

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
