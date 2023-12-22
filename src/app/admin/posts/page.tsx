"use client";
import { useState, useEffect } from "react";
import axiosRequest from "@/api/index";
import { ResData } from "@/@types/index";

import { Button, Space } from "antd";
import TotalText from "../components/TotalText";
import AdminTable from "../components/Table";
import SearchBar from "../components/SearchBar";
import { PostingsType, Posting } from "@/@types/Posting";

import * as S from "../admin.styled";
import Link from "next/link";

import MESSAGE from "@/constants/message";

export default function Posts() {
  const [postData, setPostData] = useState<Posting[]>([]);

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filterPlanetName, setFilterPlanetName] = useState("");
  const [filterAuthorNickname, setFilterAuthorNickname] = useState("");
  const [filterTitle, setFilterTitle] = useState("");

  async function getPosts() {
    try {
      let apiUrl = `/articles?limit=${itemsPerPage}&page=${currentPage}`;
      if (filterPlanetName) {
        apiUrl += `&planetName=${filterPlanetName}`;
      }
      if (filterAuthorNickname) {
        apiUrl += `&authorNickname=${filterAuthorNickname}`;
      }
      if (filterTitle) {
        apiUrl += `&title=${filterTitle}`;
      }
      const response = await axiosRequest.requestAxios<ResData<PostingsType>>("get", apiUrl);
      // 아래 data.articles 아닌지 확인
      setPostData(response.data.articles);
      setTotal(response.data.total);
    } catch (error) {
      alert("에러가 발생했습니다. 다시 시도해 주세요.");
    }
  }

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getPosts();
  }, [filterPlanetName, filterAuthorNickname, filterTitle]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onDeleteArticle = async (articleId: number) => {
    if (confirm(MESSAGE.POST.DELETE)) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Posting[]>>("delete", `/articles/admin/${articleId}`);
        getPosts();
      } catch (error) {
        alert("에러가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  const columns = [
    {
      title: "행성명",
      dataIndex: ["planet", "name"] as ["planet", "name"],
      key: "planet.name",
    },
    {
      title: "제목",
      dataIndex: "title" as keyof Posting,
      key: "title",
    },
    {
      title: "작성자",
      dataIndex: ["author", "nickName"] as (keyof Posting)[],
      key: "author.nickName",
    },
    {
      title: "작성일자",
      key: "createdAt",
      render: (record: Posting) => {
        const date = new Date(record.createdAt);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    {
      title: "자세히 보기",
      key: "view",
      render: (record: Posting) => (
        <Space size="middle">
          <Link href={`/planet/${record.planet?.id}/post?detail=${record.id}`}>자세히 보기</Link>
        </Space>
      ),
    },
    {
      title: "삭제",
      key: "delete",
      render: (record: Posting) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onDeleteArticle(record.id)}>
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <S.AdminLayout>
      <S.TableContainer>
        <S.AdminContent>
          <S.TopContent>
            <TotalText titleText={"게시글"} totalNum={total} unit={"개"} />
            <SearchBar
              searchType="posts"
              onSearch={data => {
                setFilterPlanetName(data.name);
                setFilterAuthorNickname(data.authorNickname);
                setFilterTitle(data.title);
              }}
            />
          </S.TopContent>
          <AdminTable
            data={postData}
            columns={columns}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            total={total}
            onPageChange={onPageChange}
          />
        </S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
