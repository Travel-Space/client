import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div>
        <Link href="/">
          <span>TRAVEL</span>SPACE
        </Link>
        <ul>
          <li>
            <button type="button">NOTIFICATION</button>
          </li>
          <li>
            <Link href="/mypage">MYPAGE</Link>
          </li>
          <li>
            <button type="button">LOGIN</button>
            <button type="button">LOGOUT</button>
          </li>
        </ul>
      </div>
    </header>
  );
}
