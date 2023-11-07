import { useState } from "react";
import { useSearchParams } from "next/navigation";

import axiosRequest from "@/api";
import { ResData } from "@/@types";
import MESSAGE from "@/constants/message";

import * as S from "./index.styled";
import DropDown from "../DropDown";

interface ReportProps {
  title: string;
  onClick: () => void;
  commentId?: Number;
}

export default function DeclarationModal({ title, onClick, commentId }: ReportProps) {
  const targetType = title === "게시글" ? "ARTICLE" : title === "댓글" ? "COMMENT" : "MESSAGE";

  const params = useSearchParams();
  const targetId = Number(params.get("detail"));

  const [selectedMenu, setSelectedMenu] = useState("");

  const [image, setImage] = useState(null);

  const [report, setReport] = useState({
    reason: selectedMenu, // 신고 내용
    targetId, // 게시글 아이디, 댓글 아이디
    targetType, // article, comment, message
    imageUrl: image, // 신고 사진
  });

  const dropDownProps = {
    comment: "신고 사유를 선택해 주세요.", //미선택시 보여질 문구(필요할 때만 추가)
    menuList: [
      "스팸 홍보/도배글입니다.",
      "음란물입니다.",
      "불법 정보를 포함하고 있습니다.",
      "청소년에게 유해한 내용입니다.",
      "욕설/생명 경시/혐오/차별적 표현입니다.",
      "개인정보 노출 게시물입니다.",
      "불쾌한 표현이 있습니다.",
    ],
    selectedMenu, //선택한 메뉴를 저장할 변수
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드를 전달해주세요
  };

  const handleImage = async (e: any) => {
    try {
      const formData = new FormData();
      formData.append("files", e.target.files[0]);

      const response = await axiosRequest.requestAxios("post", "/upload", formData);

      setImage(response.data[0]);
      setReport(prevState => ({
        ...prevState,
        reason: selectedMenu,
        imageUrl: response.data[0],
      }));
    } catch (error) {
      alert("이미지 업로드 안 됨");
      console.error(error);
    }
  };

  const handleComplete = async () => {
    try {
      // axios 보내기
      const response = await axiosRequest.requestAxios<ResData<Report>>("post", "/reports", {
        reason: selectedMenu, // 신고 내용
        targetId, // 게시글 아이디, 댓글 아이디
        targetType, // article, comment, message
        imageUrl: image,
      });

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
              <input readOnly value={image || ""} placeholder="파일을 업로드해 주세요." />
              <label htmlFor="file">사진 첨부</label>
              <input accept="image/*" type="file" id="file" name="imageUrl" onChange={handleImage} />
            </S.File>
          </S.Picture>
        </S.Middle>

        <S.Bottom>
          <S.CancelBtn onClick={onClick}>취소</S.CancelBtn>
          <S.CheckBtn onClick={handleComplete}>확인</S.CheckBtn>
        </S.Bottom>
      </S.Container>
    </S.Background>
  );
}
