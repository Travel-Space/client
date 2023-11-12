import axiosRequest from "@/api/index";
import { ResData } from "@/@types";

import AdminModalContainer from "../AdminModalContainer";
import Textarea from "@/components/common/Textarea";
import { Report } from "@/@types/Report";
import { REPORT } from "@/constants/reports";

import * as S from "./index.styled";
import { useEffect, useState } from "react";
import DropDown from "@/components/common/DropDown";
import Button from "@/components/common/Button";

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
    React.SetStateAction<{
      reportName: boolean;
      reportReason: boolean;
    }>
  >;
}

export default function ReportAcceptModal({ report, setIsOpen }: ReportAcceptModalProps) {
  console.log(report, "승인 report");

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

  console.log(approvalReason, "이유 상세");
  console.log(selectedReason, "선택이유");

  const dropDownProps = {
    comment: "사유 선택",
    menuList,
    selectedMenu: selectedReason,
    handleClick: setSelectedReason,
  };

  const isEtcSelected = selectedReason === REPORT.ETC;

  const patchReportReason = async (reportId: number) => {
    if (selectedReason === dropDownProps.comment) return alert("수락 사유를 선택해 주세요.");
    if (selectedReason === REPORT.ETC && approvalReason.length === 0) return alert("수락 사유를 입력해 주세요.");

    const data = isEtcSelected ? { approvalReason: approvalReason } : { approvalReason: selectedReason };

    if (reportCount > 1) {
      const currentDate = new Date();
      const nextWeekDate = new Date(currentDate);
      nextWeekDate.setDate(currentDate.getDate() + 7);
      data.suspensionEndDate = `${nextWeekDate.getFullYear()}-${(nextWeekDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${nextWeekDate.getDate().toString().padStart(2, "0")}`;
    }

    console.log("수락할 때 보내는 데이터 -------- ", data);

    if (confirm("요청을 수락할까요?")) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Report[]>>(
          "patch",
          `/reports/${reportId}/approve`,
          data,
        );
        alert("신고 요청을 수락했어요.");
        setIsOpen(() => ({ reportName: false, reportReason: false }));
        console.log(response, "수락Response");
      } catch (error) {
        alert("에러");
      }
    }
  };

  return (
    <AdminModalContainer
      title="신고 요청 수락"
      closeModal={() => {
        setIsOpen(() => ({ reportName: false, reportReason: false }));
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
            placeholder="사유를 작성해 주세요. 작성한 사유는 유저에게 알림으로 전송됩니다."
            name="adminComments"
            maxLength={200}
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
