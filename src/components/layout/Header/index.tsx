import Link from "next/link";
import * as S from "./index.styled";
import Account from "@/components/Account";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import axios from "axios";

export default function Header() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const { isAuth } = useRecoilValue(userAtom);
  const [_, setAuth] = useRecoilState(userAtom);

  async function handleLogout() {
    try {
      await axios.delete("/auth/logout");
      setAuth(prev => ({ ...prev, isAuth: false }));
    } catch (error) {
      console.error("로그아웃 에러", error);
    }
  }

  return (
    <S.Wrap>
      <S.Container>
        <Link href="/">
          <img src="/assets/img/icons/logo.svg" />
        </Link>
        <S.List>
          {isAuth ? (
            <>
              <li>
                <button type="button">
                  <img src="/assets/img/icons/notification.svg" />
                  {/* <img src="/assets/img/icons/notifications.svg" /> */}
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
