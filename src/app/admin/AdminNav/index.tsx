import Link from "next/link";
import * as S from "./index.styled";
import { usePathname } from "next/navigation";

const sideMenuItems = [
  { label: "사용자 관리", url: "/admin/users" },
  { label: "게시글 관리", url: "/admin/posts" },
  { label: "행성 리스트 관리", url: "/admin/planets" },
  { label: "신고 관리", url: "/admin/reports" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <S.Side>
      <S.SideMenu theme="light" mode="vertical" selectedKeys={[pathname]}>
        {sideMenuItems.map((item, idx) => (
          <S.MenuItem key={item.url}>
            <Link href={item.url}>{item.label}</Link>
          </S.MenuItem>
        ))}
      </S.SideMenu>
    </S.Side>
  );
}
