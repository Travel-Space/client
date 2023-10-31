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

export default function ReportAcceptModal({ report }: { report: Report }) {
  const [approvalReason, setApprovalReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

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

  // 기타인 경우 상세 이유 데이터 저장 어떤 식으로?
  const patchReportReason = async (reportId: number) => {
    if (selectedReason === dropDownProps.comment) return alert("수락 사유를 선택해 주세요.");
    if (selectedReason === REPORT.ETC && approvalReason.length === 0) return alert("수락 사유를 입력해 주세요.");

    if (confirm("요청을 수락할까요?")) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Report[]>>(
          "patch",
          `/reports/${reportId}/approve`,
          approvalReason,
        );
        console.log(response);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
  };

  return (
    // 모달 관리
    <AdminModalContainer title="신고 요청 수락" closeModal={() => console.log("TEST")}>
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
                  <span>닉네임</span>현규현규
                </p>
                <p>
                  <span>이메일</span>test@naver.com
                </p>
                <p>
                  <span>계정 상태</span>신고 2회
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

        <Button variant="basic" shape="small" size="smallWithXsFont" onClick={() => patchReportReason(report.id)}>
          완료
        </Button>
      </S.Content>
    </AdminModalContainer>
  );
}
