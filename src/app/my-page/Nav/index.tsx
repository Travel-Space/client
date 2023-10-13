"use client";
import * as S from "./index.styled";

import NavList from "./NavList";
import Divider from "@/app/my-page/Divider";
import Profile from "@/app/my-page/Nav/Profile";

export default function Nav() {
  return (
    <S.Container>
      <Profile imgSrc={"/assets/img/icons/default-user.svg"} nickname={"곰숨곰숨짱"} email={"aaaa1234@gmail.com"} />
      <Divider width="100%" height="1px" />
      <NavList
        href="/my-page/statistics"
        logo={"/assets/img/icons/statistics-management.svg"}
        title={"통계"}
        list={[{ href: "/my-page/statistics", title: "행성 통계" }]}
      />
      <Divider width="100%" height="1px" />
      <NavList
        href="/my-page/basic-info/profile"
        logo={"/assets/img/icons/basicInfo-management.svg"}
        title={"기본 정보 관리"}
        list={[
          { href: "/my-page/basic-info/profile", title: "프로필" },
          { href: "/my-page/basic-info/planet", title: "행성" },
        ]}
      />
      <Divider width="100%" height="1px" />
      <NavList
        href="/my-page/contents/postings"
        logo={"/assets/img/icons/contents-management.svg"}
        title={"컨텐츠 관리"}
        list={[
          { href: "/my-page/contents/postings", title: "게시글" },
          { href: "/my-page/contents/comments", title: "댓글" },
        ]}
      />
      <Divider width="100%" height="1px" />
      <NavList
        href="/my-page/friend/list"
        logo={"/assets/img/icons/friend-management.svg"}
        title={"친구 관리"}
        list={[
          { href: "/my-page/friend/list", title: "친구 목록" },
          { href: "/my-page/friend/add", title: "친구 추가" },
        ]}
      />
      <Divider width="100%" height="1px" />
      <NavList
        href="/my-page/like/planet"
        logo={"/assets/img/icons/like-management.svg"}
        title={"좋아요 관리"}
        list={[
          { href: "/my-page/like/planet", title: "행성" },
          { href: "/my-page/like/posting", title: "게시글" },
        ]}
      />
    </S.Container>
  );
}
