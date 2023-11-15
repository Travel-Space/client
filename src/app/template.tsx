"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import ChatBtn from "@/components/common/ChatBtn";
import GlobalStyles from "@/styles/global";
import theme from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";

export default function Template({ children }: { children: React.ReactNode }) {
  // pathname === chat 일 경우 채팅 버튼 삭제
  const pathname = usePathname();
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        {pathname !== "/chat/" && <ChatBtn />}
        {children}
      </ThemeProvider>
    </RecoilRoot>
  );
}
