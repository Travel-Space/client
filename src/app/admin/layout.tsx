"use client";

import * as S from "./admin.styled";
import AdminNav from "./AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <S.AdminLayout>
      <AdminNav />
      <S.TableContainer>
        <S.AdminContent>{children}</S.AdminContent>
      </S.TableContainer>
    </S.AdminLayout>
  );
}
