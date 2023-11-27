"use client";
import { userAtom } from "@/recoil/atoms/user.atom";
import * as S from "./page.styled";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import MESSAGE from "@/constants/message";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const params = useSearchParams();
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (user || !params.get("email") || !params.get("name")) {
      alert(MESSAGE.ERROR.WRONG);
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
