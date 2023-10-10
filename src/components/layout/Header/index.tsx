import Link from "next/link";
import * as S from "./index.styled";
import Account from "@/app/account";
import { useState } from "react";

export default function Header() {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <>
      <S.Wrap>
        <S.Container>
          <Link href="/">
            <img src="/assets/img/icons/logo.svg" />
          </Link>
          <S.List>
            {/* 회원 */}
            <li>
              <button type="button">
                <img src="/assets/img/icons/notification.svg" />
                {/* <img src="/assets/img/icons/notifications.svg" /> */}
              </button>
            </li>
            <li>
              <Link href="/mypage">MYPAGE</Link>
            </li>
            <li>
              <button type="button">LOGOUT</button>
            </li>
            {/* 비회원 */}
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
          </S.List>
        </S.Container>
      </S.Wrap>
      {showLogin ? <Account onClose={() => setShowLogin(false)} /> : null}
    </>
  );
}
