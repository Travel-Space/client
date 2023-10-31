"use client";
import * as S from "../admin.styled";
import axiosRequest from "@/api/index";
import { useState, useEffect } from "react";
import { Report, ResData } from "@/@types/Report";
import { Select, Button, Space } from "antd";

import TotalText from "../TotalText";
import SearchBar from "../SearchBar";
import ReportNameModal from "../Modal/ReportNameModal";
import ReportAcceptModal from "../Modal/ReportAcceptModal";
import AdminTable from "../Table";

export default function Reports() {
  const [reportsData, setReportsData] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report[]>([]);
  const [isOpen, setIsOpen] = useState({
    reportName: false,
    reportReason: false,
  });

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function getReports() {
      try {
        const response = await axiosRequest.requestAxios<ResData<Report[]>>(
          "get",
          `/reports?page=${page}&pageSize=${pageSize}`,
        );
        setReportsData(response.data.reports);
      } catch (error) {
        alert("오류");
      }
    }
    getReports();
  }, []);
  console.log(reportsData);

  const getReportDetails = async (id: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Report[]>>("get", `/reports/${id}`);
      openReportModal(response.data);
      console.log(response);
    } catch (error) {
      console.error("특정 신고 내용을 불러오는 중 에러 발생:", error);
    }
  };

  const onViewArticle = (id: number) => {
    console.log(`자세히 보기: ${id}`);
  };

  const openReportModal = (report: Report) => {
    setSelectedReport(report);
    setIsOpen(() => ({ reportReason: false, reportName: true }));
  };

  console.log(isOpen);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "RECEIVED":
      case "UNDER_REVIEW":
        return "검토 중";
      case "APPROVED":
        return "요청 승낙";
      case "REJECTED":
        return "요청 거절";
      default:
        return status;
    }
  };

  const columns = [
    {
      title: "접수 일자",
      key: "createdAt",
      render: (record: Report) => {
        const date = new Date(record.createdAt);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    {
      title: "신고자",
      dataIndex: "reporterId" as keyof Report,
      key: "reporterId",
    },
    {
      title: "이메일",
      dataIndex: "email" as keyof Report,
      key: "email",
    },
    {
      title: "신고내용",
      key: "reason",
      render: (record: Report) => (
        <Space size="middle">
          <Button type="link" onClick={() => getReportDetails(record.id)}>
            자세히 보기
          </Button>
        </Space>
      ),
    },
    {
      title: (
        <Select defaultValue="처리 상태" style={{ width: 100 }}>
          <Select.Option value="">전체</Select.Option>
          <Select.Option value="검토 중">검토 중</Select.Option>
          <Select.Option value="요청 거절">요청 거절</Select.Option>
          <Select.Option value="요청 수락">요청 수락</Select.Option>
        </Select>
      ),
      dataIndex: "status" as keyof Report,
      key: "status",
      render: (status: string) => <span>{getStatusLabel(status)}</span>,
    },
    {
      title: "처리 내용",
      key: "view",
      render: (record: Report) => (
        <Space size="middle">
          <Button type="link" onClick={() => onViewArticle(record.reporterId)}>
            자세히 보기
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
            <TotalText titleText={"신고"} totalNum={reportsData.length} unit={"개"} />
            <SearchBar />
          </S.TopContent>
          <AdminTable data={reportsData} columns={columns} />
          {isOpen.reportName && <ReportNameModal report={selectedReport} setIsOpen={setIsOpen} />}
          {isOpen.reportReason && <ReportAcceptModal report={selectedReport} />}
        </S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
