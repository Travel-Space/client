import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import * as S from "./index.styled";
import Side from "../../components/common/Side";
import NotificationList from "./NotificationList";
import { userAtom } from "@/recoil/atoms/user.atom";
import { Notification } from "@/@types/Notification";

interface NotificationProps {
  onClickNotification: () => void;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
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
          <NotificationList notifications={notifications} setNotifications={setNotifications} />
        </S.NotificationListContainer>
      )}
    </Side>
  );
}
