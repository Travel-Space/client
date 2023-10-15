import * as S from "./index.styled";

export default function ShipsSettings() {
  return (
    <S.Wrap>
      <S.LinkButton>
        <img src="/assets/img/icons/users.svg" />
        행성 멤버 관리
      </S.LinkButton>
      <S.ExitButton>행성 탈출 💥</S.ExitButton>
    </S.Wrap>
  );
}
