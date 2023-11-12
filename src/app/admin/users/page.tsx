"use client";
import axiosRequest from "@/api/index";
import { ResData } from "@/@types/index";
import { User } from "@/@types/User";

import { Select, Button, Space } from "antd";
import * as S from "../admin.styled";
import TotalText from "../TotalText";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";

import AdminTable from "../Table";
import ReasonsRestrictionActivityModal from "../Modal/ReasonsRestrictionActivityModal";

export default function Users() {
  const [userData, setUserData] = useState<User>([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isOpen, setIsOpen] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterNickName, setFilterNickName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState("");

  const getUsers = async () => {
    try {
      let apiUrl = `/user?limit=${itemsPerPage}&page=${currentPage}`;
      if (filterName) {
        apiUrl += `&name=${filterName}`;
      }
      if (filterEmail) {
        apiUrl += `&email=${filterEmail}`;
      }
      if (filterNickName) {
        apiUrl += `&nickname=${filterNickName}`;
      }
      if (filterStatus !== "") {
        apiUrl += `&isSuspended=${filterStatus}`;
      }

      const response = await axiosRequest.requestAxios<ResData<Report>>("get", apiUrl);
      setUserData(response.data.data);
      console.log(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      alert("정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
    }
  };
  console.log(filterStatus);

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getUsers();
  }, [filterName, filterEmail, filterNickName, filterStatus]);

  console.log(userData, "유저데이터");

  const formatSuspensionDate = (suspensionDate: string) => {
    if (suspensionDate) {
      const date = new Date(suspensionDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return suspensionDate;
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onDeleteUser = async (id: number) => {
    try {
      // const idAsString = id.toString();
      const response = await axiosRequest.requestAxios<ResData<User[]>>("delete", `/user/${id}`);
      // setUserData(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      alert("에러가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const onSuspendUser = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const columns = [
    {
      title: "이름",
      dataIndex: "name" as keyof User,
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
      title: "계정 신고 횟수",
      dataIndex: "reportCount" as keyof User,
      key: "reportCount",
    },
    {
      title: (
        <Select
          defaultValue={filterStatus}
          style={{ width: 140 }}
          value={filterStatus}
          onChange={value => setFilterStatus(value)}
        >
          <Select.Option value="">전체</Select.Option>
          <Select.Option value="true">활동 제한</Select.Option>
          <Select.Option value="false">활동 가능</Select.Option>
        </Select>
      ),
      key: "isSuspended",
      render: (record: User) =>
        record.isSuspended ? `활동 제한 ${formatSuspensionDate(record.userSuspensionDate)}` : "활동 가능",
    },
    {
      title: "제한",
      key: "isSuspended",
      render: (record: User) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onSuspendUser(record)} disabled={record.isSuspended}>
            제한
          </Button>
        </Space>
      ),
    },
    {
      title: "삭제",
      key: "delete",
      render: (record: User) => (
        <Space size="middle">
          <Button type="default" onClick={() => onDeleteUser(record.id)}>
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
            <TotalText titleText={"사용자"} totalNum={total} unit={"명"} />
            <SearchBar
              searchType="users"
              onSearch={data => {
                setFilterName(data.name);
                setFilterEmail(data.email);
                setFilterNickName(data.nickName);
              }}
            />
          </S.TopContent>
          <AdminTable
            data={userData}
            columns={columns}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            total={total}
            onPageChange={onPageChange}
          />
          {isOpen && <ReasonsRestrictionActivityModal user={selectedUser} setIsOpen={setIsOpen} />}
        </S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
