import AdminModalContainer from "../AdminModalContainer";
import Textarea from "@/components/common/Textarea";
import * as S from "./index.styled";
import Button from "@/components/common/Button";
import { useState } from "react";
import DropDown from "@/components/common/DropDown";
import { REPORT } from "@/constants/reports";
import { useEffect } from "react";
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
    if (selectedReason === dropDownProps.comment) return alert("제한 사유를 선택해 주세요.");
    if (selectedReason === REPORT.ETC && approvalReason.length === 0) return alert("제한 사유를 입력해 주세요.");

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

    if (confirm("유저 활동을 제한할까요?")) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Report[]>>("patch", `/user/${id}/suspend`, data);
        alert("유저 활동을 제한 했어요.");
        // console.log(response, "제한");
      } catch (error) {
        alert("에러");
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
            maxLength={200}
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
