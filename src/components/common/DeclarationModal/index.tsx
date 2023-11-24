import { useState } from "react";

import axiosRequest from "@/api";
import { ResData } from "@/@types";
import MESSAGE from "@/constants/message";
import REPORT from "@/constants/reports";
import useImageUpload from "@/hooks/useImageUpload";

import * as S from "./index.styled";
import DropDown from "../DropDown";

interface ReportProps {
  title: string;
  onClick: () => void;
  targetId?: Number;
}

export default function DeclarationModal({ title, onClick, targetId }: ReportProps) {
  const targetType = title === "게시글" ? "ARTICLE" : title === "댓글" ? "COMMENT" : "MESSAGE";

  const [selectedMenu, setSelectedMenu] = useState("");
  const { status, imageUrl, handleImage } = useImageUpload();

  const [report, setReport] = useState({
    reason: selectedMenu, // 신고 내용
    targetId, // 게시글 아이디, 댓글 아이디
    targetType, // article, comment, message
    imageUrl, // 신고 사진
  });

  const dropDownProps = {
    comment: REPORT.SELECT, //미선택시 보여질 문구(필요할 때만 추가)
    menuList: [
      REPORT.SPAM,
      REPORT.PORNOGRAPHY,
      REPORT.ILLEGAL,
      REPORT.HARMFUL_TO_ADOLESCENTS,
      REPORT.HATE,
      REPORT.PERSONAL_INFORMATION_EXPOSURE,
      REPORT.UNPLEASANT_CONTENT,
    ],
    selectedMenu, //선택한 메뉴를 저장할 변수
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드를 전달해주세요
  };

  const handleReport = async () => {
    try {
      const updatedReport = {
        ...report,
        reason: selectedMenu,
        imageUrl,
      };

      const response = await axiosRequest.requestAxios<ResData<Report>>("post", "/reports", updatedReport);

      alert(MESSAGE.REPORTS.COMPLETE);
      onClick();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Background>
      <S.Container>
        <S.Top>
          <img src="/assets/img/icons/declaration.svg" />
          <span>{title} 신고하기</span>
        </S.Top>

        <S.Middle>
          <S.Reason>
            <span>신고 사유</span>
            <DropDown color="gray" font="md" shape="round" props={dropDownProps} />
          </S.Reason>

          <S.Picture>
            <span>신고 사진</span>
            <S.File>
              <input readOnly value={imageUrl || ""} placeholder="파일을 업로드해 주세요." />
              <label htmlFor="file">사진 첨부</label>
              <input
                accept="image/*"
                id="file"
                type="file"
                name="imageUrl"
                onChange={e => handleImage(e.target.files)}
              />
            </S.File>
          </S.Picture>
        </S.Middle>

        <S.Bottom>
          <S.CancelBtn onClick={onClick}>취소</S.CancelBtn>
          <S.CheckBtn onClick={handleReport} disabled={status}>
            확인
          </S.CheckBtn>
        </S.Bottom>
      </S.Container>
    </S.Background>
  );
}
