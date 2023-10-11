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
      <NavList
        href="/my/statistics"
        logo={"/assets/img/icons/statistics-management.svg"}
        title={"통계"}
        list={[{ href: "/my/statistics", title: "행성 통계" }]}
      />
      <Divider />
      <NavList
        href="/my/basicInfo/profile"
        logo={"/assets/img/icons/basicInfo-management.svg"}
        title={"기본 정보 관리"}
        list={[
          { href: "/my/basicInfo/profile", title: "프로필" },
          { href: "/my/basicInfo/planet", title: "행성" },
        ]}
      />
      <Divider />
      <NavList
        href="/my/contents/postings"
        logo={"/assets/img/icons/contents-management.svg"}
        title={"컨텐츠 관리"}
        list={[
          { href: "/my/contents/postings", title: "게시글" },
          { href: "/my/contents/comments", title: "댓글" },
        ]}
      />
      <Divider />
      <NavList
        href="/my/friend/list"
        logo={"/assets/img/icons/friend-management.svg"}
        title={"친구 관리"}
        list={[
          { href: "/my/friend/list", title: "친구 목록" },
          { href: "/my/friend/add", title: "친구 추가" },
        ]}
      />
      <Divider />
      <NavList
        href="/my/like/planet"
        logo={"/assets/img/icons/like-management.svg"}
        title={"좋아요 관리"}
        list={[
          { href: "/my/like/planet", title: "행성" },
          { href: "/my/like/posting", title: "게시글" },
        ]}
      />
    </S.Container>
  );
}
