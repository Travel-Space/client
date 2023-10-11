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
        href="/my/profile"
        logo={"/assets/img/icons/default-user.svg"}
        title={"기본 정보 관리"}
        list={[
          { href: "/my/profile", title: "프로필" },
          { href: "/my/planet", title: "행성" },
        ]}
      />
      <Divider />
      <NavList
        href="/my/postings"
        logo={"/assets/img/icons/contents-management.svg"}
        title={"컨텐츠 관리"}
        list={[
          { href: "/my/postings", title: "게시글" },
          { href: "/my/comments", title: "댓글" },
        ]}
      />
      <Divider />
      <NavList
        href="/my/friends"
        logo={"/assets/img/icons/friend-management.svg"}
        title={"친구 관리"}
        list={[
          { href: "/my/friends", title: "친구 목록" },
          { href: "/my/addFriend", title: "친구 추가" },
        ]}
      />
      <Divider />
      <NavList
        href="/my/planetLike"
        logo={"/assets/img/icons/like-management.svg"}
        title={"좋아요 관리"}
        list={[
          { href: "/my/planetLike", title: "행성" },
          { href: "/my/postingLike", title: "게시글" },
        ]}
      />
    </S.Container>
  );
}
