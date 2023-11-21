import { isAxiosError } from "axios";
import { ResData, User } from "@/@types";
import axiosRequest from "@/api";

import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

import Account from "@/components/Account";

import * as S from "./index.styled";
import Image from "next/image";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";

export default function Header() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [newNotificationReceived, setNewNotificationReceived] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("delete", "/auth/logout", {});

      if (response.status === 200) {
        alert("로그아웃이 성공적으로 완료되었습니다!");
        setUser(null);
        router.push("/");
      }
    } catch (error) {
      console.error("로그아웃 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
        if (error.response?.data.statusCode === 401) {
          setUser(null);
          router.push("/");
        }
      }
    }
  };

  const openNotification = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <S.Wrap>
      <S.Container>
        <Link href="/">
          <Image width={259} height={35} alt="트래블스페이스 로고" src="/assets/img/icons/logo.svg" />
        </Link>
        <S.List>
          {user?.isAuth ? (
            <>
              <li>
                <button type="button" onClick={openNotification}>
                  {newNotificationReceived ? (
                    <Image width={36} height={36} alt="" src="/assets/img/icons/notifications.svg" />
                  ) : (
                    <Image width={36} height={36} alt="알림 아이콘" src="/assets/img/icons/notification.svg" />
                  )}
                </button>
                {isOpen && (
                  <Notification
                    onClickNotification={openNotification}
                    setNewNotificationReceived={setNewNotificationReceived}
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
                  setShowLogin(true);
                }}
              >
                LOGIN
              </button>
            </li>
          )}
        </S.List>
      </S.Container>
      {showLogin ? <Account onClose={() => setShowLogin(false)} /> : null}
    </S.Wrap>
  );
}
