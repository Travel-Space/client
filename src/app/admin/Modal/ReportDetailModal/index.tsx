import axiosRequest from "@/api/index";
import { ResData } from "@/@types";

import Link from "next/link";
import AdminModalContainer from "../AdminModalContainer";
import { Report } from "@/@types/Report";

import * as S from "./index.styled";
import ImageModal from "../ImageModal";

import { useState } from "react";
import { getDateInfo } from "@/utils/getDateInfo";
import Tab from "../../Tab";

interface ReportDetailModalProps {
  report: Report;
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      reportName: boolean;
      reportReason: boolean;
    }>
  >;
}

export default function ReportDetailModal({ report, setIsOpen }: ReportDetailModalProps) {
  console.log(report, " ~~~~~~~~~~~~~~~~~~~~ report");
  const [isSelected, setIsSelected] = useState({
    name: true,
    processingDetails: false,
  });
  const [openImageModal, setIsOpenImageModal] = useState(false);

  const openImage = () => {
    setIsOpenImageModal(prev => !prev);
  };
  const {
    targetDetails: {
      author: { nickName, email },
    },
    reportDetails: { id, reporterName, createdAt, planetId, reason, status, approvalReason, processingDate, imageUrl },
  } = report;

  console.log(imageUrl);
  const { dateString, dayName, time } = getDateInfo(createdAt);
  const { dateString: processDate, dayName: processDay, time: processTime } = getDateInfo(processingDate);

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

  return (
    <AdminModalContainer
      title="신고 처리 내용"
      closeModal={() => {
        setIsOpen(prev => ({ ...prev, reportDetail: false }));
      }}
    >
      {openImageModal && <ImageModal image={imageUrl} openImage={openImage} />}

      <Tab setIsSelected={setIsSelected} isSelected={isSelected} />
      <S.Content>
        {isSelected.name && (
          <>
            <ul>
              <li>
                <span>접수일자</span>
                <p>
                  {dateString}, {dayName}, {time}
                </p>
              </li>
              <li>
                <span>신고자</span>
                <p>{reporterName}</p>
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

            {imageUrl && (
              <S.ImgBox onClick={openImage}>
                <img src={imageUrl} />
              </S.ImgBox>
            )}

            <Link href={`/planet/${planetId}/post?detail=${id}`}>
              <S.Button>신고 내용 상세 확인</S.Button>
            </Link>
          </>
        )}

        {isSelected.processingDetails && (
          <ul>
            <li>
              <span>처리 일자</span>
              <p>
                {processDate}, {processDay}, {processTime}
              </p>
            </li>
            <li>
              <span>처리 내용</span>
              <p>{getStatusLabel(status)}</p>
            </li>
            {status !== "REJECTED" && (
              <li>
                <span>처리 사유</span>
                <p>{approvalReason}</p>
              </li>
            )}
          </ul>
        )}
      </S.Content>
    </AdminModalContainer>
  );
}
