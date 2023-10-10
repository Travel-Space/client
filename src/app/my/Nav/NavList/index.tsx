import * as S from "./index.styled";

interface NavListProps {
  logo: string;
  title: string;
  list: string[];
}

export default function NavList({ logo, title, list }: NavListProps) {
  return (
    <S.Container>
      <S.UserImg src={logo} />
      <div>
        <S.Title>{title}</S.Title>
        {list.map(el => (
          <S.SubTitle>{el}</S.SubTitle>
        ))}
      </div>
    </S.Container>
  );
}
