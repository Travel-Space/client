import { useState } from "react";
import Textarea from "../Textarea";
import * as S from "./index.styled";
import DropDown from "../DropDown";

export default function DeclarationModal({ title, onClick }: { title: string; onClick: () => void }) {
  const [selectedMenu, setSelectedMenu] = useState("");

  const dropDownProps = {
    comment: "신고 사유를 선택해 주세요.", //미선택시 보여질 문구(필요할 때만 추가)
    menuList: [
      "음란물입니다.",
      "불법 정보를 포함하고 있습니다.",
      "스팸 홍보/청소년에게 유해한 내용입니다.",
      "욕설/생명 경시/혐오 차별적 표현입니다.",
      "개인 정보 노출 게시물입니다.",
      "불쾌한 표현이 있습니다.",
    ],
    selectedMenu: selectedMenu, //선택한 메뉴를 저장할 변수
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드를 전달해주세요
  };

  return (
    <S.Background>
      <S.Container>
        <S.Top>
          <img src="/assets/img/icons/declaration.svg" />
          <span>{title} 신고하기</span>
        </S.Top>

        <S.Middle>
          <S.Description>
            <span>신고 내용</span>
            <Textarea
              name="description"
              size="declaration"
              placeholder={"신고 내용을 입력해 주세요."}
              maxLength={200}
            />
          </S.Description>

          {title !== "채팅" && (
            <S.Reason>
              <DropDown color="gray" font="sm" shape="round" props={dropDownProps} />
            </S.Reason>
          )}

          <S.Picture>
            <span>신고 사진</span>
            <S.File>
              <input readOnly placeholder="파일을 업로드해 주세요." />
              <label htmlFor="file">사진 첨부</label>
              <input accept="image/*" type="file" id="file" />
            </S.File>
          </S.Picture>
        </S.Middle>

        <S.Bottom>
          <S.CancelBtn>취소</S.CancelBtn>
          <S.CheckBtn>확인</S.CheckBtn>
        </S.Bottom>
      </S.Container>
    </S.Background>
  );
}
