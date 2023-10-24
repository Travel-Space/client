"use client";

import type { Metadata } from "next";
import { RecoilRoot } from "recoil";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import GlobalStyles from "@/styles/global";
import theme from "@/styles/theme";
import { ThemeProvider } from "styled-components";

import Header from "@/components/layout/Header";
import ChatBtn from "@/components/common/ChatBtn";

const metadata: Metadata = {
  title: "Travel Space",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  // pathname === chat 일 경우 채팅 버튼 삭제
  const pathname = usePathname();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <html>
            <body>
              <Header />
              {pathname !== "/chat" && <ChatBtn />}
              {children}
            </body>
          </html>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
