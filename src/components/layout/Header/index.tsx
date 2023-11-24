import { isAxiosError } from "axios";
import { ResData, User } from "@/@types";
import { Notification as NotificationType } from "@/@types/Notification";
import axiosRequest from "@/api";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

import * as HEADER from "./index.styled";
import Account from "@/components/Account";
import Notification from "@/components/Notification";
import STATUS_CODE from "@/constants/statusCode";
import useSocket from "@/hooks/useSocket";

export default function Header() {
  const [loginVisible, setLoginVisible] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [newNotificationReceived, setNewNotificationReceived] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const socket = useSocket("");

  useEffect(() => {
    if (socket && user?.isAuth) {
      const handleNotifications = (data: NotificationType[]) => {
        setNotifications(prev => [
          ...prev.filter(
            existingNotification => !data.some(newNotification => newNotification.id === existingNotification.id),
          ),
          ...data,
        ]);
        setNewNotificationReceived(true);
      };

      // console.log("알림", notifications);
      socket.emit("subscribeToNotifications", { userId: user?.id });
      socket.on("notifications", handleNotifications);

      if (notifications.length === 0) {
        setNewNotificationReceived(false);
      }

      // return () => {
      //   socket.off("notifications", handleNotifications);
      // };
    }
  }, [socket, user?.isAuth]);

  // console.log(newNotificationReceived, "newNotificationReceived");
  // console.log(notifications, "notifications");

  const setLogout = () => {
    setUser(null);
    return router.push("/");
  };

  const handleLogout = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("delete", "/auth/logout", {});

      if (response.status === STATUS_CODE.OK) {
        alert("로그아웃이 성공적으로 완료되었습니다!");
        setLogout();
      }
    } catch (error) {
      console.error("로그아웃 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
        if (error.response?.data.statusCode === STATUS_CODE.UNAUTHORIZED) {
          setLogout();
        }
      }
    }
  };

  const openNotification = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <HEADER.Wrap>
      <HEADER.Container>
        <Link href="/">
          <Image width={259} height={35} alt="트래블스페이스 로고" src="/assets/img/icons/logo.svg" />
        </Link>
        <HEADER.List>
          {user?.isAuth ? (
            <>
              <li>
                <button type="button" onClick={openNotification}>
                  <Image
                    width={36}
                    height={36}
                    alt="알림 아이콘"
                    src={`/assets/img/icons/${newNotificationReceived ? "notifications" : "notification"}.svg`}
                  />
                </button>
                {isOpen && (
                  <Notification
                    notifications={notifications}
                    setNotifications={setNotifications}
                    onClickNotification={openNotification}
                  />
                )}
              </li>
              <li>
                <Link href="/mypage/statistics">MYPAGE</Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                type="button"
                onClick={() => {
                  setLoginVisible(true);
                }}
              >
                LOGIN
              </button>
            </li>
          )}
        </HEADER.List>
      </HEADER.Container>
      {loginVisible && <Account onClose={() => setLoginVisible(false)} />}
    </HEADER.Wrap>
  );
}
