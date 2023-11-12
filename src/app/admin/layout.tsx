"use client";

import * as S from "./admin.styled";
import AdminNav from "./AdminNav";
import { useEffect } from "react";

import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    if (!user?.isAuth || user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [user]);

  return (
    <S.AdminLayout>
      <AdminNav />
      <S.TableContainer>
        <S.AdminContent>{children}</S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
