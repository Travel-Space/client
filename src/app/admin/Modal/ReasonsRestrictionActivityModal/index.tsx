import { useState, useEffect } from "react";
import * as S from "./index.styled";

import MESSAGE from "@/constants/message";

import Button from "@/components/common/Button";
import Textarea from "@/components/common/Textarea";
import DropDown from "@/components/common/DropDown";
import AdminModalContainer from "../AdminModalContainer";

import REPORT from "@/constants/reports";

import axiosRequest from "@/api";
import { ResData, User } from "@/@types";

interface ReasonsRestrictionActivityModalProps {
  user: User;
  setIsOpen: React.Dispatch<
    React.SetStateAction<{ reportName: boolean; reportReason: boolean; reportDetail: boolean }>
  >;
}

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

export default function ReasonsRestrictionActivityModal({ user, setIsOpen }: ReasonsRestrictionActivityModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [approvalReason, setApprovalReason] = useState("");

  const { reportCount, id } = user;

  const dropDownProps = {
    comment: "사유 선택",
    menuList,
    selectedMenu: selectedReason,
    handleClick: setSelectedReason,
  };

  useEffect(() => {
    if (selectedReason !== REPORT.ETC) {
      setApprovalReason("");
    }
  }, [selectedReason]);

  const isEtcSelected = selectedReason === REPORT.ETC;

  const patchReportReason = async (id: number) => {
    if (selectedReason === dropDownProps.comment) return alert(MESSAGE.REPORTS.SELECTEDREASON);
    if (selectedReason === REPORT.ETC && approvalReason.length === 0) return alert(MESSAGE.REPORTS.REASON);
    if (selectedReason === REPORT.ETC && approvalReason.length > 30) return alert(MESSAGE.REPORTS.SYNTAX_ACCEPT);

    let formattedSuspensionEndDate = "";

    const currentDate = new Date();
    const nextWeekDate = new Date(currentDate);
    nextWeekDate.setDate(currentDate.getDate() + 7);
    formattedSuspensionEndDate = `${nextWeekDate.getFullYear()}-${(nextWeekDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${nextWeekDate.getDate().toString().padStart(2, "0")}`;

    const data = isEtcSelected
      ? { suspensionReason: approvalReason, suspensionEndDate: formattedSuspensionEndDate }
      : { suspensionReason: selectedReason, suspensionEndDate: formattedSuspensionEndDate };

    if (confirm(MESSAGE.REPORTS.SUSPEND)) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Report[]>>("patch", `/user/${id}/suspend`, data);
        alert(MESSAGE.REPORTS.SUSPENDFIN);
      } catch (error) {
        alert("에러가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <AdminModalContainer
      title="활동 제한 사유"
      closeModal={() => {
        setIsOpen(prevState => ({ ...prevState, reportName: false, reportReason: false }));
      }}
    >
      <S.Content>
        <S.Title>사유</S.Title>

        <S.SelectWithDefaultWrapper>
          <DropDown font="sm" shape="default" color="black" props={dropDownProps} />
        </S.SelectWithDefaultWrapper>

        <S.TextareaWrapper>
          <Textarea
            size="admin"
            placeholder="사유를 작성해 주세요. 작성한 사유는 유저에게 알림으로 전송됩니다."
            name="adminComments"
            maxLength={30}
            value={approvalReason}
            onChange={e => setApprovalReason(e.target.value)}
            disabled={!isEtcSelected}
          />
        </S.TextareaWrapper>
        <Button variant="basic" shape="small" size="smallWithXsFont" onClick={() => patchReportReason(id)}>
          {reportCount !== 2 ? "완료" : "완료시 해당 유저는 활동 제한 상태로 전환됩니다."}
        </Button>
      </S.Content>
    </AdminModalContainer>
  );
}
