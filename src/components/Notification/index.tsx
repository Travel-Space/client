import * as S from "./index.styled";
import Side from "../../components/common/Side";
import NotificationList from "./NotificationList";
import { Notification as NotificationType } from "@/@types/Notification";

interface NotificationProps {
  onClickNotification: () => void;
  notifications: NotificationType[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
}

export default function Notification({
  onClickNotification,
  notifications,
  setNotifications, // setNewNotificationReceived,
}: NotificationProps) {
  return (
    <Side>
      <S.TitleContainer>
        <p>알림이 도착했어요!</p>
        <S.CloseButton type="button" onClick={onClickNotification}>
          닫기
        </S.CloseButton>
      </S.TitleContainer>

      {/* 알림 리스트 */}
      {notifications.length == 0 ? (
        <>
          <S.NothingWrapper>
            <S.NothingIcon></S.NothingIcon>
            <S.NothingText>아직 아무것도 없어요.</S.NothingText>
          </S.NothingWrapper>
        </>
      ) : (
        <S.NotificationListContainer>
          <NotificationList
            notifications={notifications}
            setNotifications={setNotifications}
            onClickNotification={onClickNotification}
          />
        </S.NotificationListContainer>
      )}
    </Side>
  );
}
