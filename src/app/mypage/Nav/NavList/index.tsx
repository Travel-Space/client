import * as S from "./index.styled";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavListProps {
  logo: JSX.Element;
  parent: { name: string; href: string };
  sub: { name: string; href: string }[];
}

export default function NavList({ logo, parent, sub }: NavListProps) {
  const pathname = usePathname();

  return (
    <S.Container>
      {logo}
      <S.List>
        <S.Title>
          <Link href={sub[0].href}>{parent.name}</Link>
        </S.Title>
        <S.SubTitle>
          {sub.map((el, idx) => (
            <Link key={idx} href={el.href} className={pathname === el.href ? "active" : ""}>
              {el.name}
            </Link>
          ))}
        </S.SubTitle>
      </S.List>
    </S.Container>
  );
}
