import AdminModalContainer from "../AdminModalContainer";
import * as S from "./index.styled";

export default function ReasonsRestrictionActivityModal() {
  return (
    <AdminModalContainer title="활동 제한 사유">
      <S.Content>
        <S.Title>사유</S.Title>

        <S.SelectWithDefaultWrapper>{/* <SelectWithDefault /> */}</S.SelectWithDefaultWrapper>

        <S.TextareaWrapper>{/* <Textarea /> */}</S.TextareaWrapper>

        <S.Button>완료</S.Button>
      </S.Content>
    </AdminModalContainer>
  );
}
