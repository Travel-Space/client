"use client";

import { usePathname } from "next/navigation";
import GlobalStyles from "@/styles/global";
import theme from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/layout/Header"), { ssr: false });
const ChatBtn = dynamic(() => import("@/components/common/ChatBtn"), { ssr: false });

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
