"use client";
import axiosRequest from "@/api/index";
import { ResData } from "@/@types/index";

import Link from "next/link";
import * as S from "../admin.styled";

import TotalText from "../TotalText";
import SearchBar from "../SearchBar";
import { Select, Button, Space, Pagination, Tag } from "antd";

import { Planet } from "@/@types/Planet";
import { useEffect, useState } from "react";
import AdminTable from "../Table";

export default function Planets() {
  const [planetData, setPlanetData] = useState<Planet[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  async function getPlanet() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet[]>>(
        "get",
        `/planet?limit=${itemsPerPage}&page=${currentPage}`,
      );
      setPlanetData(response.data.planets);
      setTotal(response.data.totalCount);
      console.log(response.data);
    } catch (error) {
      alert("정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
    }
  }

  useEffect(() => {
    getPlanet();
  }, []);

  console.log("planet", planetData);

  // 행성 삭제 api 필요
  const onDeletePlanet = async (planetId: number) => {
    console.log(`게시글 삭제: ${planetId}`);
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet[]>>("delete", `/planet/${planetId}`);
      console.log(response.data);
    } catch (error) {
      alert("삭제 에러");
    }
  };

  const columns = [
    {
      title: "행성명",
      key: "name",
      render: (record: Planet) => {
        return (
          <Space size="middle">
            <Link href={`/planet/${record.id}/map`}>{record.name}</Link>
          </Space>
        );
      },
    },
    {
      title: "해시태그",
      dataIndex: "hashtags" as keyof Planet,
      key: "hashtags",
      render: (hashtags: string[]) => (
        <span>{hashtags && hashtags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}</span>
      ),
    },
    {
      title: "행성관리자",
      dataIndex: ["owner", "name"] as ["owner", "name"],
      key: "owner.name",
    },
    {
      title: "멤버 수",
      dataIndex: ["members", "length"] as ["members", "length"],
      key: "members.length",
    },
    {
      title: (
        <Select defaultValue="공개 여부" style={{ width: 100 }}>
          <Select.Option value="공개">공개</Select.Option>
          <Select.Option value="비공개">비공개</Select.Option>
        </Select>
      ),
      key: "published",
      render: (record: Planet) => <Space size="middle">{record.published ? "공개" : "비공개"}</Space>,
    },
    {
      title: "삭제",
      key: "delete",
      render: (record: Planet) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onDeletePlanet(record.id)}>
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
            <TotalText titleText={"행성"} totalNum={total} unit={"개"} />
            <SearchBar />
          </S.TopContent>

          <AdminTable data={planetData} columns={columns} />
        </S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
