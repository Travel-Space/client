"use client";
import * as S from "./index.styled";

import NavList from "./NavList";
import Profile from "@/app/mypage/Nav/Profile";

interface Menu {
  name: string;
  href: string;
}
interface NavData {
  logo: JSX.Element;
  parentMenu: Menu;
  subMenu: Menu[];
}
interface NavProps {
  navData: NavData[];
}

export default function Nav({ navData }: NavProps) {
  return (
    <S.Container>
      <Profile imgSrc={"/assets/img/icons/default-user.svg"} nickname={"곰숨곰숨짱"} email={"aaaa1234@gmail.com"} />
      {navData.map((el, idx) => (
        <NavList key={idx} logo={el.logo} parent={el.parentMenu} sub={el.subMenu} />
      ))}
    </S.Container>
  );
}
