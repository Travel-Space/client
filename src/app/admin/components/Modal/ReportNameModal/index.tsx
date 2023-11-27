import { useState } from "react";
import axiosRequest from "@/api/index";
import { ResData } from "@/@types/index";

import Link from "next/link";
import * as S from "./index.styled";

import { getDateInfo } from "@/utils/getDateInfo";

import AdminModalContainer from "../AdminModalContainer";
import ImageModal from "../ImageModal";

import { Report } from "@/@types/Report";
import MESSAGE from "@/constants/message";

interface ReportNameModalProps {
  report: Report;
  setIsOpen: React.Dispatch<
    React.SetStateAction<{ reportName: boolean; reportReason: boolean; reportDetail: boolean }>
  >;
}

export default function ReportNameModal({ report, setIsOpen }: ReportNameModalProps) {
  const [openImageModal, setIsOpenImageModal] = useState(false);

  const {
    reportDetails: { createdAt, reason, imageUrl, id: reportDetailId, reporterName, targetType },
    targetDetails: {
      author: { nickName, email },
      planetId,
      id: targetDetailsId,
    },
  } = report;

  const { dateString, dayName, time } = getDateInfo(createdAt);

  const approveReport = () => {
    setIsOpen(prevState => ({ ...prevState, reportName: false, reportReason: true }));
  };
  const openImage = () => {
    setIsOpenImageModal(prev => !prev);
  };

  const refuseReport = async (id: number) => {
    if (confirm(MESSAGE.REPORTS.REFUSE)) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Report[]>>("patch", `/reports/${id}/reject`);
        alert(MESSAGE.REPORTS.REFUSEFIN);
        setIsOpen(prevState => ({ ...prevState, reportName: false, reportReason: false }));
      } catch (error) {
        alert("에러가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <AdminModalContainer
      title="신고 내용"
      closeModal={() => {
        setIsOpen(prevState => ({ ...prevState, reportName: false, reportReason: false, reportDetail: false }));
      }}
    >
      {openImageModal && imageUrl && <ImageModal image={imageUrl} openImage={openImage} />}
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

        {targetType !== "MESSAGE" && (
          <Link href={`/planet/${planetId}/post?detail=${targetDetailsId}`}>
            <S.Button>신고 내용 상세 확인</S.Button>
          </Link>
        )}

        <S.ButtonContainer>
          <S.ButtonAccept onClick={approveReport}>요청승낙</S.ButtonAccept>
          <S.ButtonRefuse onClick={() => refuseReport(reportDetailId)}>요청거절</S.ButtonRefuse>
        </S.ButtonContainer>
      </S.Content>
    </AdminModalContainer>
  );
}
