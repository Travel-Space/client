"use client";
import axiosRequest from "@/api/index";
import { ResData } from "@/@types/index";
import { useState, useEffect } from "react";
import * as S from "../admin.styled";

import { Report } from "@/@types/Report";
import { Select, Button, Space } from "antd";

import TotalText from "../TotalText";
import SearchBar from "../SearchBar";
import ReportNameModal from "../Modal/ReportNameModal";
import ReportAcceptModal from "../Modal/ReportAcceptModal";
import ReportDetailModal from "../Modal/ReportDetailModal";
import AdminTable from "../Table";

export default function Reports() {
  const [reportsData, setReportsData] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report[]>([]);
  const [isOpen, setIsOpen] = useState({
    reportName: false,
    reportReason: false,
    reportDetail: false,
  });

  const [total, setTotal] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const getReports = async () => {
    try {
      let apiUrl = `/reports/search?page=${currentPage}&pageSize=${pageSize}`;
      if (filterName) {
        apiUrl += `&name=${filterName}`;
      }
      if (filterEmail) {
        apiUrl += `&email=${filterEmail}`;
      }
      if (filterStatus !== "") {
        apiUrl += `&status=${filterStatus}`;
      }

      const response = await axiosRequest.requestAxios<ResData<Report>>("get", apiUrl);
      setReportsData(response.data.reports);
      console.log("신고", response.data);
      setTotal(response.data.totalCount);
    } catch (error) {
      alert("오류");
    }
  };

  useEffect(() => {
    getReports();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getReports();
  }, [filterName, filterEmail, filterStatus]);

  const getReportDetails = async (id: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Report>>("get", `/reports/${id}`);
      openReportModal(response.data);
      console.log(response, "GetReportDetail");
    } catch (error) {
      console.error("특정 신고 내용을 불러오는 중 에러 발생:", error);
    }
  };

  const onViewReportDetails = async (id: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Report>>("get", `/reports/${id}`);
      setSelectedReport(response.data);
      setIsOpen(() => ({ reportReason: false, reportName: false, reportDetail: true }));
    } catch (error) {
      console.error("특정 신고 내용을 불러오는 중 에러 발생:", error);
    }
  };

  const openReportModal = (report: Report) => {
    setSelectedReport(report);
    setIsOpen(() => ({ reportReason: false, reportName: true, reportDetail: false }));
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "RECEIVED":
        return "검토 중";
      case "APPROVED":
        return "요청 수락";
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
      dataIndex: ["reporter", "name"] as (keyof Report)[],
      key: "reporter.name",
    },
    {
      title: "이메일",
      dataIndex: ["reporter", "email"] as (keyof Report)[],
      key: "reporter.email",
    },
    {
      title: "신고내용",
      key: "reason",
      render: (record: Report) => (
        <Space size="middle">
          <Button type="link" onClick={() => getReportDetails(record.id)} disabled={record.status !== "RECEIVED"}>
            자세히 보기
          </Button>
        </Space>
      ),
    },
    {
      title: (
        <Select
          defaultValue={getStatusLabel(filterStatus)}
          style={{ width: 100 }}
          value={filterStatus}
          onChange={value => setFilterStatus(value)}
        >
          <Select.Option value="">전체</Select.Option>
          <Select.Option value="RECEIVED">검토 중</Select.Option>
          <Select.Option value="REJECTED">요청 거절</Select.Option>
          <Select.Option value="APPROVED">요청 수락</Select.Option>
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
          <Button type="link" onClick={() => onViewReportDetails(record.id)} disabled={record.status == "RECEIVED"}>
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
            <TotalText titleText={"신고"} totalNum={total} unit={"개"} />
            <SearchBar
              searchType="reports"
              onSearch={data => {
                setFilterName(data.name);
                setFilterEmail(data.email);
              }}
            />
          </S.TopContent>

          <AdminTable
            data={reportsData}
            columns={columns}
            currentPage={currentPage}
            itemsPerPage={pageSize}
            total={total}
            onPageChange={onPageChange}
          />

          {isOpen.reportName && <ReportNameModal report={selectedReport} setIsOpen={setIsOpen} />}
          {isOpen.reportReason && <ReportAcceptModal report={selectedReport} setIsOpen={setIsOpen} />}
          {isOpen.reportDetail && <ReportDetailModal report={selectedReport} setIsOpen={setIsOpen} />}
        </S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
