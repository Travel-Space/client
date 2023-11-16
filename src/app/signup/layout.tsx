"use client";
import * as S from "./page.styled";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <S.Wrap>
      <S.Container>{children}</S.Container>
    </S.Wrap>
  );
}
