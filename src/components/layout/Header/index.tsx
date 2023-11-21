import { isAxiosError } from "axios";
import { ResData, User } from "@/@types";
import axiosRequest from "@/api";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

import * as HEADER from "./index.styled";
import Account from "@/components/Account";
import Notification from "@/components/Notification";
import STATUS_CODE from "@/constants/statusCode";

export default function Header() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [newNotificationReceived, setNewNotificationReceived] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("delete", "/auth/logout", {});

      if (response.status === STATUS_CODE.OK) {
        alert("로그아웃이 성공적으로 완료되었습니다!");
        setUser(null);
        return router.push("/");
      }
    } catch (error) {
      console.error("로그아웃 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
        if (error.response?.data.statusCode === STATUS_CODE.UNAUTHORIZED) {
          setUser(null);
          return router.push("/");
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
        </HEADER.List>
      </HEADER.Container>
      {showLogin && <Account onClose={() => setShowLogin(false)} />}
    </HEADER.Wrap>
  );
}
