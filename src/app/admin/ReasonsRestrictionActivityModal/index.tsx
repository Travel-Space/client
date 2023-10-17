import AdminModalContainer from "../AdminModalContainer";
import Textarea from "@/components/common/Textarea";
import * as S from "./index.styled";

export default function ReasonsRestrictionActivityModal() {
  return (
    <AdminModalContainer title="활동 제한 사유">
      <S.Content>
        <S.Title>사유</S.Title>

        <S.SelectWithDefaultWrapper>{/* <SelectWithDefault /> */}</S.SelectWithDefaultWrapper>

        <S.TextareaWrapper>
          <Textarea
            size="admin"
            placeholder="사유를 작성해 주세요. 작성한 사유는 유저에게 알림으로 전송됩니다."
            name="adminComments"
            maxLength={200}
          />
        </S.TextareaWrapper>

        <S.Button>완료</S.Button>
      </S.Content>
    </AdminModalContainer>
  );
}
