import * as S from "./index.styled";

export default function Item({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <S.Container>
      <S.Name>{name}</S.Name>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
}
