"use client";
import axiosRequest from "@/api/index";
import { ResData } from "@/@types/index";
import { User, UsersType } from "@/@types/User";

import { Select, Button, Space } from "antd";
import * as S from "../admin.styled";

import { getDateInfo } from "@/utils/getDateInfo";
import TotalText from "../TotalText";
import SearchBar from "../SearchBar";
import { useState, useEffect } from "react";

import AdminTable from "../Table";
import ReasonsRestrictionActivityModal from "../Modal/ReasonsRestrictionActivityModal";
import MESSAGE from "@/constants/message";

export default function Users() {
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isOpen, setIsOpen] = useState({
    reportName: false,
    reportReason: false,
    reportDetail: false,
  });

  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterNickName, setFilterNickName] = useState("");
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

      const response = await axiosRequest.requestAxios<ResData<UsersType>>("get", apiUrl);
      setUserData(response.data.data);
      // console.log(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      alert("에러가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getUsers();
  }, [filterName, filterEmail, filterNickName, filterStatus]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 유저 삭제시 - 행성 소유하고 있을 때 관리자가 행성 및 게시글 삭제 해줘야 함 => 이 부분 백엔드, 기획이랑 의논 필요
  const onDeleteUser = async (id: number) => {
    if (confirm(MESSAGE.USER.DELETE)) {
      try {
        const response = await axiosRequest.requestAxios<ResData<User[]>>("delete", `/user/${id}`);
        setUserData(prev => prev.filter(user => user.id !== id));
      } catch (error) {
        alert("에러가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  const onSuspendUser = (user: User) => {
    setSelectedUser(user);
    setIsOpen(prevState => ({ ...prevState, reportReason: true }));
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
      render: (record: User) => {
        if (record.isSuspended && record.userSuspensionDate) {
          const { dateString, dayName } = getDateInfo(record.userSuspensionDate);
          return `활동 제한 ${dateString} ${dayName}`;
        } else {
          return "활동 가능";
        }
      },
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
          {isOpen.reportReason && selectedUser && (
            <ReasonsRestrictionActivityModal user={selectedUser} setIsOpen={setIsOpen} />
          )}
        </S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
