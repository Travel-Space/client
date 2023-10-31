"use client";
import axiosRequest from "@/api/index";
import { ResData } from "@/@types/index";
import { User } from "@/@types/User";

import { Select, Button, Space, Pagination } from "antd";
import * as S from "../admin.styled";
import TotalText from "../TotalText";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";

import AdminTable from "../Table";

export default function Users() {
  const [userData, setUserData] = useState<User[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  async function getUsers(page: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<User[]>>(
        "get",
        `/user?limit=${itemsPerPage}&page=${currentPage}`,
      );
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      alert("정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
    }
  }

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const onDeleteUser = async (id: number) => {
    try {
      const idAsString = id.toString();
      const response = await axiosRequest.requestAxios<ResData<User[]>>("delete", `/user/${idAsString}`);

      console.log(response.data, "삭제후");

      // setUserData(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      alert("에러가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const columns = [
    {
      title: "이름",
      dataIndex: ["name"] as ["name"],
      key: "name",
    },
    {
      title: "닉네임",
      dataIndex: "nickName" as keyof User,
      key: "nickName",
    },
    {
      title: "이메일",
      dataIndex: "email" as keyof User,
      key: "email",
    },
    {
      title: (
        <Select
          defaultValue="계정 신고 상태"
          style={{ width: 140 }}
          // onChange={handleFilterChange}
          options={[
            { value: "", label: "전체" },
            { value: 0, label: "0회" },
            { value: 1, label: "1회" },
            { value: 2, label: "2회" },
            { value: "활동 제한", label: "활동 제한" },
          ]}
        />
      ),
      dataIndex: "reportCount" as keyof User,
      key: "reportCount",
    },
    {
      title: "삭제",
      key: "delete",
      render: (record: User) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onDeleteUser(record.id)}>
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
            <TotalText titleText={"사용자"} totalNum={userData.length} unit={"명"} />
            <SearchBar />
          </S.TopContent>
          <AdminTable data={userData} columns={columns} />
          {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
        </S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
