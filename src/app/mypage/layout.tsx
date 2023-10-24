"use client";
import MYPAGENAV from "@/constants/mypageNav";
import { styled } from "styled-components";
import { usePathname } from "next/navigation";
import { flexCenter, bodyContainer } from "@/styles/common";

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

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const parentPath = pathname.split("/")[2];

  return (
    <Container>
      <Nav navData={MYPAGENAV} />
      <MainContainer>
        <Tab>
          {MYPAGENAV.map(
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
