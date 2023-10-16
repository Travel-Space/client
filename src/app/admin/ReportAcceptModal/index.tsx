import AdminModalContainer from "../AdminModalContainer";
import SelectWithDefault from "../SelectWithDefault";
import Textarea from "../Textarea";
import * as S from "./index.styled";

export default function ReportAcceptModal() {
  return (
    <AdminModalContainer>
      <S.TitleContainer>
        <p>신고 요청 수락</p>
      </S.TitleContainer>

      <S.Content>
        <ul>
          {/* 컴포넌트 분리 */}
          <S.TitleList>
            <S.Circle>
              <p>1</p>
            </S.Circle>
            <S.TitleText>신고 받은 유저 정보</S.TitleText>
          </S.TitleList>

          <S.TitleList>
            <S.Circle>
              <p>2</p>
            </S.Circle>
            <S.TitleText>요청 수락 사유</S.TitleText>
          </S.TitleList>
        </ul>

        {/* select 컴포넌트 */}
        {/* <SelectWithDefault /> */}

        {/* textarea 컴포넌트 */}
        <S.TextareaContainer>
          <Textarea />
        </S.TextareaContainer>

        <S.Button>완료</S.Button>
      </S.Content>
    </AdminModalContainer>
  );
}
