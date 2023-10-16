import AdminModalContainer from "../AdminModalContainer";
import Textarea from "../Textarea";
import * as S from "./index.styled";
import SelectWithDefault from "../SelectWithDefault";

export default function ReasonsRestrictionActivityModal() {
  return (
    <AdminModalContainer>
      <S.TitleContainer>
        <p>활동 제한 사유</p>
      </S.TitleContainer>

      <S.Content>
        <S.Title>사유</S.Title>
        <S.SelectWithDefaultWrapper>
          <SelectWithDefault />
        </S.SelectWithDefaultWrapper>
        <S.TextareaWrapper>
          <Textarea />
        </S.TextareaWrapper>

        <S.Button>완료</S.Button>
      </S.Content>
    </AdminModalContainer>
  );
}
