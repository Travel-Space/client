import AdminModalContainer from "../AdminModalContainer";
import * as S from "./index.styled";

export default function ReportNameModal() {
  return (
    // <AdminModalContainer title="신고 내용">
    <S.Content>
      <ul>
        <li>
          <span>접수일자</span>
          <p>2023. 10. 12</p>
        </li>
        <li>
          <span>신고자</span>
          <p>조아연</p>
        </li>
        <li>
          <span>신고 대상 닉네임</span>
          <p>현규현규</p>
        </li>
        <li>
          <span>신고 대상 이메일</span>
          <p>test@naver.com</p>
        </li>
        <li>
          <span>신고 사유</span>
          <p>최대 100자 입력 가능</p>
        </li>
      </ul>

      <S.ImgBox>TEST</S.ImgBox>

      <S.Button>신고 내용 상세 확인</S.Button>
      <S.ButtonContainer>
        <S.ButtonAccept>요청승낙</S.ButtonAccept>
        <S.ButtonRefuse>요청거절</S.ButtonRefuse>
      </S.ButtonContainer>
    </S.Content>
    // </AdminModalContainer>
  );
}
