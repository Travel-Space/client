"use client";
import axiosRequest from "@/api/index";
import { ResData } from "@/@types/index";

import { Posting } from "@/@types/Posting";
import { Select, Button, Space, Pagination } from "antd";

import * as S from "../admin.styled";
import TotalText from "../TotalText";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminTable from "../Table";

export default function Posts() {
  const [postData, setPostData] = useState<Posting[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  async function getPosts() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>(
        "get",
        `/articles?limit=${itemsPerPage}&page=${currentPage}`,
      );
      setPostData(response.data);
      console.log(response.data);
    } catch (error) {
      alert("오류");
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const onDeleteArticle = async (articleId: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("delete", `/articles/${articleId}`);
      setPostData(response.data);
    } catch (error) {
      alert("오류");
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
          <Link href={`/planet/${record.planet.id}/post?detail=${record.id}`}>자세히 보기</Link>
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
            <TotalText titleText={"게시글"} totalNum={100} unit={"개"} />
            <SearchBar />
          </S.TopContent>
          <AdminTable data={postData} columns={columns} />
        </S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
