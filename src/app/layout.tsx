import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Space",
  description: "다녀온 여행을 기록해 보세요!",
  icons: {
    icon: "/planet.svg",
  },
  // 오픈 그래프 설정
  openGraph: {
    title: "Travle Space: 트래블 스페이스",
    description: "다녀온 여행을 기록하는 나만의 공간",
    url: "https://travelspace.world/",
    siteName: "Travel Space",
    images: [
      {
        url: "",
        width: 0,
        height: 0,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
