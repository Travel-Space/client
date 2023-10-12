import * as S from "./index.styled";
import Link from "next/link";

interface NavListProps {
  href: string;
  logo: string;
  title: string;
  list: { href: string; title: string }[];
}

export default function NavList({ href, logo, title, list }: NavListProps) {
  return (
    <S.Container>
      <S.UserImg src={logo} />
      <S.List>
        <Link href={href}>
          <S.Title>{title}</S.Title>
        </Link>
        {list.map(el => (
          <S.SubTitle>
            <Link href={el.href}>{el.title}</Link>
          </S.SubTitle>
        ))}
      </S.List>
    </S.Container>
  );
}
