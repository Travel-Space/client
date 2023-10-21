"use client";
import { styled } from "styled-components";
import { usePathname } from "next/navigation";
import { flexCenter, bodyContainer } from "@/styles/common";

import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import Line from "@/components/common/Line";

const Container = styled.div`
  ${bodyContainer}
  display: flex;
  gap: 48px;
  padding: 40px 0;
`;
const MainContainer = styled.div`
  width: 952px;
  min-height: 846px;
  padding: 28px 32px 54px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[200]};
`;
const Tab = styled.ul`
  display: flex;
  & > a {
    ${flexCenter}
    width: 98px;
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.gray[200]};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 700;
    line-height: 17px;
    padding-bottom: 8px;

    &:hover {
      color: ${({ theme }) => theme.PALETTE.black};
    }
    &.active {
      color: ${({ theme }) => theme.PALETTE.black};
      border-bottom: 1px solid ${({ theme }) => theme.PALETTE.black};
    }
  }
`;
const MainContent = styled.div`
  margin-top: 40px;
`;

const navData = [
  {
    logo: <Image src="/assets/img/icons/statistics-management.svg" alt="statistics" width={20} height={20} />,
    parentMenu: { name: "통계", href: "statistics" },
    subMenu: [{ name: "행성 통계", href: "/mypage/statistics" }],
  },
  {
    logo: <Image src="/assets/img/icons/basicInfo-management.svg" alt="statistics" width={20} height={20} />,
    parentMenu: { name: "기본 정보 관리", href: "basic-info" },
    subMenu: [
      { name: "프로필", href: "/mypage/basic-info/profile" },
      { name: "행성", href: "/mypage/basic-info/planet" },
    ],
  },
  {
    logo: <Image src="/assets/img/icons/contents-management.svg" alt="statistics" width={20} height={20} />,
    parentMenu: { name: "컨텐츠 관리", href: "contents" },
    subMenu: [
      { name: "게시글", href: "/mypage/contents/postings" },
      { name: "댓글", href: "/mypage/contents/comments" },
    ],
  },
  {
    logo: <Image src="/assets/img/icons/friend-management.svg" alt="statistics" width={20} height={20} />,
    parentMenu: { name: "친구 관리", href: "friend" },
    subMenu: [
      { name: "친구 목록", href: "/mypage/friend/list" },
      { name: "친구 추가", href: "/mypage/friend/add" },
    ],
  },
  {
    logo: <Image src="/assets/img/icons/like-management.svg" alt="statistics" width={20} height={20} />,
    parentMenu: { name: "좋아요 관리", href: "like" },
    subMenu: [
      { name: "행성", href: "/mypage/like/planets" },
      { name: "게시글", href: "/mypage/like/postings" },
    ],
  },
];

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const parentPath = pathname.split("/")[2];

  return (
    <Container>
      <Nav navData={navData} />
      <MainContainer>
        <Tab>
          {navData.map(
            (el, idx) =>
              el.parentMenu.href === parentPath &&
              el.subMenu.map((el, idx) => (
                <Link key={idx} href={el.href} className={pathname === el.href ? "active" : ""}>
                  {el.name}
                </Link>
              )),
          )}
        </Tab>
        <Line color="gray" size="horizontal" />
        <MainContent>{children}</MainContent>
      </MainContainer>
    </Container>
  );
}
