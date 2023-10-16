import * as S from "./index.styled";

export default function NotificationList() {
  return (
    <S.NotificationList>
      <S.NotificationContent>
        <S.Icon>아이콘</S.Icon>
        <S.TextBox>
          <p>아연아연님이 회원님의 게시글을 좋아해요.</p>
          <span>2023.10.03 18:37:01</span>
        </S.TextBox>
      </S.NotificationContent>
      <S.RemoveContent>삭제</S.RemoveContent>
    </S.NotificationList>
  );
}
