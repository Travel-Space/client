import AdminModalContainer from "../AdminModalContainer";
import * as S from "./index.styled";
import { useState } from "react";

import { Report, ResData } from "@/@types/Report";
import { getDateInfo } from "@/utils/getDateInfo";
import axiosRequest from "@/api/index";
import ReportAcceptModal from "../ReportAcceptModal";

interface ReportNameModalProps {
  report: Report;
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      reportName: boolean;
      reportReason: boolean;
    }>
  >;
}

export default function ReportNameModal({ report, setIsOpen }: ReportNameModalProps) {
  console.log("REPORT", report);

  const {
    createdAt,
    reporter: { name, nickName, email },
    reason,
    imageUrl,
    id,
  } = report;

  const { dateString, dayName, time } = getDateInfo(createdAt);

  const approveReport = () => {
    setIsOpen(() => ({ reportName: false, reportReason: true }));
  };

  const refuseReport = async (id: number) => {
    if (confirm("신고 요청을 거절할까요?")) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Report[]>>("patch", `/reports/${id}/reject`);
        console.log("성공", response);
        alert("신고 요청을 거절했어요.");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <AdminModalContainer
      title="신고 내용"
      closeModal={() => {
        console.log("TEST");
      }}
    >
      <S.Content>
        <ul>
          <li>
            <span>접수일자</span>
            <p>
              {dateString}, {dayName}, {time}
            </p>
          </li>
          <li>
            <span>신고자</span>
            <p>{name}</p>
          </li>
          <li>
            <span>신고 대상 닉네임</span>
            <p>{nickName}</p>
          </li>
          <li>
            <span>신고 대상 이메일</span>
            <p>{email}</p>
          </li>
          <li>
            <span>신고 사유</span>
            <p>{reason}</p>
          </li>
        </ul>

        <S.ImgBox>
          <img src={imageUrl} />
        </S.ImgBox>

        <S.Button>신고 내용 상세 확인</S.Button>
        <S.ButtonContainer>
          <S.ButtonAccept onClick={approveReport}>요청승낙</S.ButtonAccept>
          <S.ButtonRefuse onClick={() => refuseReport(id)}>요청거절</S.ButtonRefuse>
        </S.ButtonContainer>
      </S.Content>

      {/* {isAcceptModalVisible && <ReportAcceptModal report={report} />} */}
    </AdminModalContainer>
  );
}
