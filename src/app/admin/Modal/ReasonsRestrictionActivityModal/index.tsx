import AdminModalContainer from "../AdminModalContainer";
import Textarea from "@/components/common/Textarea";
import * as S from "./index.styled";
import Button from "@/components/common/Button";
import { useState } from "react";

export default function ReasonsRestrictionActivityModal() {
  const [reason, setReason] = useState("");
  return (
    <S.Content>
      <S.Title>사유</S.Title>

      <S.SelectWithDefaultWrapper>{/* <SelectWithDefault /> */}</S.SelectWithDefaultWrapper>

      <S.TextareaWrapper>
        <Textarea
          size="admin"
          placeholder="사유를 작성해 주세요. 작성한 사유는 유저에게 알림으로 전송됩니다."
          name="adminComments"
          maxLength={200}
          onChange={e => setReason(e.target.value)}
        />
      </S.TextareaWrapper>
      <Button variant="basic" shape="small" size="smallWithXsFont">
        완료
      </Button>
    </S.Content>
  );
}
