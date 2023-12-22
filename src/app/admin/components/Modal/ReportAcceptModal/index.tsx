import { useEffect, useState } from "react";
import axiosRequest from "@/api/index";
import { ResData } from "@/@types";

import * as S from "./index.styled";

import AdminModalContainer from "../AdminModalContainer";
import Textarea from "@/components/common/Textarea";
import DropDown from "@/components/common/DropDown";
import Button from "@/components/common/Button";

import { Report } from "@/@types/Report";
import REPORT from "@/constants/reports";
import MESSAGE from "@/constants/message";

const menuList = [
  REPORT.SPAM,
  REPORT.HARMFUL_TO_ADOLESCENTS,
  REPORT.PORNOGRAPHY,
  REPORT.ILLEGAL,
  REPORT.HATE,
  REPORT.PERSONAL_INFORMATION_EXPOSURE,
  REPORT.UNPLEASANT_CONTENT,
  REPORT.ETC,
];

interface ReportAcceptModalProps {
  report: Report;
  setIsOpen: React.Dispatch<
    React.SetStateAction<{ reportName: boolean; reportReason: boolean; reportDetail: boolean }>
  >;
}

export default function ReportAcceptModal({ report, setIsOpen }: ReportAcceptModalProps) {
  // console.log(report, "승인 report");

  const {
    targetDetails: {
      author: { nickName, email, reportCount },
    },
    reportDetails: { id },
  } = report;

  const [selectedReason, setSelectedReason] = useState("");
  const [approvalReason, setApprovalReason] = useState("");
  const [suspensionEndDate, setsSuspensionEndDate] = useState("");

  useEffect(() => {
    if (selectedReason !== REPORT.ETC) {
      setApprovalReason("");
    }
  }, [selectedReason]);

  const dropDownProps = {
    comment: "사유 선택",
    menuList,
    selectedMenu: selectedReason,
    handleClick: setSelectedReason,
  };

  const isEtcSelected = selectedReason === REPORT.ETC;

  const patchReportReason = async (reportId: number) => {
    if (selectedReason === dropDownProps.comment) return alert(MESSAGE.REPORTS.SELECTEDREASON);
    if (selectedReason === REPORT.ETC && approvalReason.length === 0) return alert(MESSAGE.REPORTS.REASON);
    if (selectedReason === REPORT.ETC && approvalReason.length > 30) return alert(MESSAGE.REPORTS.SYNTAX_ACCEPT);

    const data: { approvalReason?: string; suspensionEndDate?: string; selectedReason?: string } = isEtcSelected
      ? { approvalReason }
      : { approvalReason: selectedReason };

    if (reportCount > 1) {
      const currentDate = new Date();
      const nextWeekDate = new Date(currentDate);
      nextWeekDate.setDate(currentDate.getDate() + 7);
      data.suspensionEndDate = `${nextWeekDate.getFullYear()}-${(nextWeekDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${nextWeekDate.getDate().toString().padStart(2, "0")}`;
    }

    if (confirm(MESSAGE.REPORTS.ACCEPT)) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Report[]>>(
          "patch",
          `/reports/${reportId}/approve`,
          data,
        );
        alert(MESSAGE.REPORTS.ACCEPTFIN);
        setIsOpen(prevState => ({ ...prevState, reportName: false, reportReason: false }));
        // console.log(response, "수락Response");
      } catch (error) {
        alert("에러가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <AdminModalContainer
      title="신고 요청 수락"
      closeModal={() => {
        setIsOpen(prevState => ({ ...prevState, reportName: false, reportReason: false }));
      }}
    >
      <S.Content>
        <ul>
          {/* 컴포넌트 분리 */}
          <S.TitleList>
            <S.TitleContent>
              <S.Circle>
                <p>1</p>
              </S.Circle>
              <S.TitleText>신고 받은 유저 정보</S.TitleText>
            </S.TitleContent>
            <S.UserInfoBox>
              <div>
                <p>
                  <span>닉네임</span>
                  {nickName}
                </p>
                <p>
                  <span>이메일</span>
                  {email}
                </p>
                <p>
                  <span>계정 상태</span>신고 {reportCount}회
                </p>
              </div>
            </S.UserInfoBox>
          </S.TitleList>

          <S.TitleList>
            <S.TitleContent>
              <S.Circle>
                <p>2</p>
              </S.Circle>
              <S.TitleText>요청 수락 사유</S.TitleText>
            </S.TitleContent>
          </S.TitleList>
        </ul>

        <S.DropDownWrapper>
          <DropDown font="sm" shape="default" color="black" props={dropDownProps} />
        </S.DropDownWrapper>
        <S.TextareaContainer>
          <Textarea
            size="admin"
            placeholder="사유를 작성해 주세요."
            name="adminComments"
            maxLength={30}
            value={approvalReason}
            onChange={e => setApprovalReason(e.target.value)}
            disabled={!isEtcSelected}
          />
        </S.TextareaContainer>

        <Button variant="basic" shape="small" size="smallWithXsFont" onClick={() => patchReportReason(id)}>
          {reportCount !== 2 ? "완료" : "승낙 완료시 해당 유저는 활동 제한 상태로 전환됩니다."}
        </Button>
      </S.Content>
    </AdminModalContainer>
  );
}
