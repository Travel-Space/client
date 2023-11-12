import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import useSocket from "@/hooks/useSocket";
import * as S from "./index.styled";
import Side from "../../components/common/Side";
import NotificationList from "./NotificationList";
import { userAtom } from "@/recoil/atoms/user.atom";

type ClickNotificationFunction = () => void;

interface NotificationProps {
  onClickNotification: ClickNotificationFunction;
  setNewNotificationReceived: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Notification({ onClickNotification, setNewNotificationReceived }: NotificationProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const user = useRecoilValue(userAtom);

  const socket = useSocket("");

  useEffect(() => {
    if (socket) {
      const handleNotifications = data => {
        setNotifications(prev => [...prev, ...data]);
      };

      socket.emit("subscribeToNotifications", { userId: user?.id });
      socket.on("notifications", handleNotifications);

      return () => {
        socket.off("notifications", handleNotifications);
      };
    }
  }, []);

  console.log(notifications);

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
          <NotificationList notifications={notifications} setNotifications={setNotifications} />
        </S.NotificationListContainer>
      )}
    </Side>
  );
}
