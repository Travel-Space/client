import * as S from "./index.styled";

import axiosRequest from "@/api/index";
import { ResData } from "@/@types/index";
import { Notification } from "@/@types/Notification";
import { getDateInfo } from "@/utils/getDateInfo";

import { useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, UserType } from "@/recoil/atoms/user.atom";
import { useRouter } from "next/navigation";

interface NotificationListProps {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

export default function NotificationList({ notifications, setNotifications }: NotificationListProps) {
  const setAuth = useSetRecoilState<UserType | null>(userAtom);
  const user = useRecoilValue(userAtom);
  const router = useRouter();

  const deleteNotificationList = async (notificationId: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Notification>>(
        "delete",
        `/notification/${notificationId}`,
      );
      setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
    } catch (error) {
      alert("에러가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const sendInvitationResponse = async (
    id: number,
    planetId: number | undefined,
    invitationId: number | undefined,
    status: string,
  ) => {
    const confirmationText = status === "ACCEPTED" ? "수락" : "거절";
    if (confirm(`초대에 ${confirmationText}하면 해당 알림 리스트는 자동으로 삭제됩니다.\n${confirmationText}할까요?`)) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Notification>>(
          "patch",
          `/planet/invitations/${invitationId}/respond`,
          { status },
        );
        deleteNotificationList(id);

        if (status == "ACCEPTED") {
          const updatedMemberships = user?.memberships?.planets ? [...user.memberships.planets] : [];
          const existingMembershipIndex = updatedMemberships.findIndex(membership => membership.planetId === planetId);

          if (existingMembershipIndex !== -1) {
            updatedMemberships[existingMembershipIndex].role = "MEMBER";
          } else {
            updatedMemberships.push({ planetId: planetId!, role: "MEMBER" });
          }

          setAuth(prev => ({
            ...prev!,
            memberships: {
              ...prev!.memberships,
              planets: updatedMemberships,
            },
            isAuth: true,
          }));
          router.replace(`/planet/${planetId}/map/`);
        }
      } catch (err) {
        alert("에러가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handlePlanetJoinRequest = async (
    id: number,
    planetId: number | undefined,
    requestUserId: number | undefined,
    action: "approve" | "reject",
  ) => {
    const confirmationText = action === "approve" ? "수락" : "거절";
    if (confirm(`요청에 ${confirmationText}하면 해당 알림 리스트는 자동으로 삭제됩니다.\n${confirmationText}할까요?`)) {
      try {
        const response = await axiosRequest.requestAxios<ResData<Notification>>(
          "post",
          `/planet/${action}/${planetId}/${requestUserId}`,
        );
        deleteNotificationList(id);
      } catch (error) {
        alert("에러가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  const handleNotificationClick = (type: string, articleId: number | undefined, planetId: number | undefined) => {
    if (type === "LIKE" || type === "ARTICLE" || type === "COMMENT" || type === "SUB_COMMENT") {
      router.replace(`/planet/${planetId}/post/?detail=${articleId}`);
    } else {
      switch (type) {
        case "PLANET_INVITE":
          router.replace(`/planet/${planetId}/map/`);
          break;
        case "FOLLOW":
          router.replace(`/mypage/friend/list/`);
          break;
      }
    }
  };

  return (
    <>
      {notifications.map(notification => {
        const { id, content, createdAt, invitationId, planetId, articleId, type, requestUserId } = notification;
        const { dateString, dayName, time } = getDateInfo(createdAt);
        let iconImage = "";
        if (id) {
          const imgPath = "/assets/img/icons/notification/noti-";
          switch (type) {
            case "ACTIVITY_RESTRICTION":
              iconImage = `${imgPath}suspension.svg`;
              break;
            case "LIKE":
              iconImage = `${imgPath}favorite.svg`;
              break;
            case "PLANET_INVITE":
            case "ARTICLE":
            case "PLANET_JOIN_REQUEST":
              iconImage = `${imgPath}planet.svg`;
              break;
            case "FOLLOW":
              iconImage = `${imgPath}person.svg`;
              break;
            case "COMMENT":
            case "SUB_COMMENT":
              iconImage = `${imgPath}comment.svg`;
              break;
          }
        }

        return (
          <S.NotificationList key={id}>
            <S.NotificationContent onClick={() => handleNotificationClick(type, articleId, planetId)}>
              <S.Icon iconUrl={iconImage}>아이콘</S.Icon>
              <S.TextBox>
                <p>{content}</p>
                <span>
                  {dateString} {dayName} {time}
                </span>
              </S.TextBox>
            </S.NotificationContent>

            {type === "PLANET_INVITE" ? (
              <>
                <S.ButtonBox>
                  <S.AcceptButton onClick={() => sendInvitationResponse(id, planetId, invitationId, "ACCEPTED")}>
                    수락
                  </S.AcceptButton>
                  <S.RejectButton onClick={() => sendInvitationResponse(id, planetId, invitationId, "REJECTED")}>
                    거절
                  </S.RejectButton>
                </S.ButtonBox>
              </>
            ) : type === "PLANET_JOIN_REQUEST" ? (
              <>
                <S.ButtonBox>
                  <S.AcceptButton onClick={() => handlePlanetJoinRequest(id, planetId, requestUserId, "approve")}>
                    수락
                  </S.AcceptButton>
                  <S.RejectButton onClick={() => handlePlanetJoinRequest(id, planetId, requestUserId, "reject")}>
                    거절
                  </S.RejectButton>
                </S.ButtonBox>
              </>
            ) : (
              <S.RemoveContent onClick={() => deleteNotificationList(id)}>삭제</S.RemoveContent>
            )}
          </S.NotificationList>
        );
      })}
    </>
  );
}
