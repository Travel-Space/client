import { AxiosError } from "axios";
import { ResData, User } from "@/@types";
import axiosRequest from "@/api";

import Link from "next/link";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

import Account from "@/components/Account";

import * as S from "./index.styled";
import Image from "next/image";

export default function Header() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const { isAuth } = useRecoilValue(userAtom);
  const [_, setAuth] = useRecoilState(userAtom);

  async function handleLogout() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("delete", "/auth/logout", {});

      response.status === 200 && alert("로그아웃이 성공적으로 완료되었습니다!");
      setAuth(prev => ({ ...prev, isAuth: false }));
    } catch (error) {
      console.error("로그아웃 에러", error);
      const errorResponse = (error as AxiosError<{ message: string; statusCode: number }>).response;
      alert(errorResponse?.data.message);
      if (errorResponse?.data.statusCode == 401) {
        setAuth(prev => ({ ...prev, isAuth: false }));
      }
    }
  }

  return (
    <S.Wrap>
      <S.Container>
        <Link href="/">
          <Image width={259} height={35} alt="트래블스페이스 로고" src="/assets/img/icons/logo.svg" />
        </Link>
        <S.List>
          {isAuth ? (
            <>
              <li>
                <button type="button">
                  <Image width={36} height={36} alt="알림 아이콘" src="/assets/img/icons/notification.svg" />
                  {/* <Image width={36} height={36} alt="" src="/assets/img/icons/notifications.svg" /> */}
                </button>
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
