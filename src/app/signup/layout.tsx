"use client";
import { userAtom } from "@/recoil/atoms/user.atom";
import * as S from "./page.styled";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
    setRendered(true);
  }, [user, router]);

  if (!rendered) {
    return null;
  }

  return user ? null : (
    <S.Wrap>
      <S.Container>{children}</S.Container>
    </S.Wrap>
  );
}
