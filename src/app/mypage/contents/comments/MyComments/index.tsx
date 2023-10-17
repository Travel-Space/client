import * as S from "./index.styled";

export default function MyComments() {
  return (
    <S.Container>
      <S.InfoRow>
        <S.InfoRowCol>
          <S.Planet>지구지구행성</S.Planet>
          <S.Title>일본 여행 후쿠오카 온천온천온천 가고싶다!</S.Title>
        </S.InfoRowCol>
        <S.CreatedDate>2023년 10월 09일 월요일</S.CreatedDate>
      </S.InfoRow>
      <S.InfoRow>
        <S.Comment>저도 여기 가보고 싶어요!</S.Comment>
        <S.Buttons>
          <S.EditBtn>수정</S.EditBtn>
          <S.DeleteBtn>삭제</S.DeleteBtn>
        </S.Buttons>
      </S.InfoRow>
    </S.Container>
  );
}
