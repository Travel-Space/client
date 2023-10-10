"use client";
import * as S from "./index.styled";

import NavList from "./NavList";
import Divider from "@/app/my/Divider";
import Profile from "@/app/my/Nav/Profile";

export default function Nav() {
  return (
    <S.Container>
      <Profile imgSrc={"/assets/img/icons/default-user.svg"} nickname={"곰숨곰숨짱"} email={"aaaa1234@gmail.com"} />
      <Divider />
      <NavList logo={"/assets/img/icons/statistics-management.svg"} title={"통계"} list={["행성 통계"]} />
      <Divider />
      <NavList logo={"/assets/img/icons/default-user.svg"} title={"기본 정보 관리"} list={["프로필", "행성"]} />
      <Divider />
      <NavList logo={"/assets/img/icons/contents-management.svg"} title={"컨텐츠 관리"} list={["게시글", "댓글"]} />
      <Divider />
      <NavList logo={"/assets/img/icons/friend-management.svg"} title={"친구 관리"} list={["친구 목록", "친구 추가"]} />
      <Divider />
      <NavList logo={"/assets/img/icons/like-management.svg"} title={"좋아요 관리"} list={["행성", "게시글"]} />
    </S.Container>
  );
}
