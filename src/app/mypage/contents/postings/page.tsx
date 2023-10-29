"use client";
import axiosRequest from "@/api";
import { ResData, Posting } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import myPostingsState from "@/recoil/atoms/myPostings.atom";

import * as S from "./page.styled";

import Nothing from "@/components/common/Nothing";
import MyPostings from "./MyPostings";
import SearchForm from "@/app/mypage/SearchForm";

export default function Postings() {
  //드롭다운 데이터
  const [selectedMenu, setSelectedMenu] = useState("글 제목");
  const dropDownProps = {
    menuList: ["글 제목", "행성 이름"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
    placeholder: "글 관리에서 검색합니다.",
  };

  const [postings, setPostings] = useRecoilState(myPostingsState);

  //게시글 불러오기
  //무한스크롤 추후 적용 - 수정예정
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

  useEffect(() => {
    if (postings.length === 0) {
      getPostings();
    }
  }, []);

  return (
    <S.Container>
      {postings.length === 0 && (
        <Nothing
          src="/assets/img/icons/no-postings.svg"
          alt="no-postings"
          width={96}
          height={96}
          comment="작성된 게시글이 없습니다."
          font="lg"
        />
      )}
      <S.Header>
        <S.PostingsNumber>
          총 <span>{postings.length}</span>개의 게시글
        </S.PostingsNumber>
        <SearchForm select={dropDownProps} />
      </S.Header>
      <S.MyPostingsWrap>
        {postings.map(posting => (
          <MyPostings data={posting} />
        ))}
      </S.MyPostingsWrap>
    </S.Container>
  );
}
