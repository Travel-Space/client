import AdminModalContainer from "@/app/admin/AdminModalContainer";
import * as S from "./index.styled";

export default function ActivityRestrictionNotification() {
  return (
    <AdminModalContainer>
      <S.TitleContainer>
        <p>신고 요청 수락</p>
      </S.TitleContainer>

      <S.Content>
        <p>
          <span>닉네임</span> 님의 활동 내용이 아래와 같은 사유로 해당 계정에 <span>2023년 10월 10일</span>까지 회원
          정보 수정 및 회원 탈퇴를 제외한 활동 제한 조치가 이루어졌습니다.
        </p>

        <p>
          {" "}
          <span>사유 :</span> 욕설/생명 경시/혐오/차별적 표현입니다.
        </p>

        <S.Button>확인</S.Button>
      </S.Content>
    </AdminModalContainer>
  );
}
