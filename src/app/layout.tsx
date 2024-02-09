import StyledComponentsRegistry from "@/utils/registry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://travelspace.world"),
  title: "Travel Space",
  description: "다녀온 여행을 기록해 보세요!",
  icons: {
    icon: "/planet.svg",
  },
  openGraph: {
    title: "Travel Space: 트래블 스페이스",
    description: "다녀온 여행을 기록하는 나만의 공간",
    siteName: "Travel Space",
    images: [
      {
        url: "/assets/img/opengraph-image.png",
        width: 803,
        height: 400,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
