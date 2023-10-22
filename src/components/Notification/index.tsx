import * as S from "./index.styled";
import Side from "../../components/common/Side";
import NotificationList from "./NotificationList";

export default function Notification() {
  return (
    <Side>
      <S.TitleContainer>
        <p>알림이 도착했어요!</p>
        <S.CloseButton type="button">닫기</S.CloseButton>
      </S.TitleContainer>

      <S.NotificationListContainer>
        {/* 알림 리스트 */}
        <NotificationList />
      </S.NotificationListContainer>
    </Side>
  );
}
