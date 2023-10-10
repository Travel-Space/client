import Link from "next/link";
import * as S from "./index.styled";

export default function Header() {
  return (
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
            <button type="button">LOGIN</button>
          </li>
        </S.List>
      </S.Container>
    </S.Wrap>
  );
}
