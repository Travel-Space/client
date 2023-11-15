"use client";
import axiosRequest from "@/api/index";
import { ResData } from "@/@types/index";

import Link from "next/link";
import * as S from "../admin.styled";

import TotalText from "../TotalText";
import SearchBar from "../SearchBar";
import { Select, Button, Space, Tag } from "antd";

import { Planet } from "@/@types/Planet";
import { useEffect, useState } from "react";
import AdminTable from "../Table";

const itemsPerPage = 10;

export default function Planets() {
  const [planetData, setPlanetData] = useState<Planet[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [filterName, setFilterName] = useState("");
  const [filterHashtag, setFilterHashtag] = useState("");
  const [filterownerNickname, setFilterownerNickname] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getPlanet = async () => {
    try {
      let apiUrl = `/planet?limit=${itemsPerPage}&page=${currentPage}`;
      if (filterName) {
        apiUrl += `&name=${filterName}`;
      }
      if (filterHashtag) {
        apiUrl += `&hashtag=${filterHashtag}`;
      }
      if (filterownerNickname) {
        apiUrl += `&ownerNickname=${filterownerNickname}`;
      }

      if (filterStatus !== "") {
        apiUrl += `&published=${filterStatus}`;
      }
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", apiUrl);

      setPlanetData(response.data.planets);
      setTotal(response.data.totalCount);
      // console.log(response.data);
    } catch (error) {
      alert("정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getPlanet();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getPlanet();
  }, [filterName, filterHashtag, filterownerNickname, filterStatus]);

  // console.log("planet", planetData);
  // console.log(filterName, "행성명");

  const onDeletePlanet = async (planetId: number) => {
    if (confirm("행성을 삭제할까요?")) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Planet[]>>(
          "delete",
          `/planet/admin/delete/${planetId}`,
        );
        setPlanetData(prev => prev.filter(el => el.id !== planetId));
        getPlanet();
      } catch (error) {
        alert("삭제 에러");
      }
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
      dataIndex: ["owner", "nickName"] as ["owner", "nickName"],
      key: "owner.name",
    },
    {
      title: "멤버 수",
      dataIndex: ["members", "length"] as ["members", "length"],
      key: "members.length",
    },
    {
      title: (
        <Select
          defaultValue={filterStatus}
          style={{ width: 100 }}
          value={filterStatus}
          onChange={value => setFilterStatus(value)}
        >
          <Select.Option value="all">전체</Select.Option>
          <Select.Option value="onlytrue">공개</Select.Option>
          <Select.Option value="onlyfalse">비공개</Select.Option>
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
            <SearchBar
              searchType="planets"
              onSearch={data => {
                setFilterName(data.name);
                setFilterHashtag(data.hashtag);
                setFilterownerNickname(data.ownerNickname);
              }}
            />
          </S.TopContent>

          <AdminTable
            data={planetData}
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
