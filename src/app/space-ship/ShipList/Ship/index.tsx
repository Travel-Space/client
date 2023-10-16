import * as S from "./index.styled";

export default function Ship({ test }: { test: number }) {
  return (
    <S.Wrap>
      <S.Container onClick={() => console.log("우주선 정보")}>
        <S.ShipImg onClick={() => console.log("새 우주선")}>
          <img src="/assets/img/icons/ship-profile-create.svg" alt="" />
        </S.ShipImg>
        <S.ShipTitle>우주선 이름 {test}</S.ShipTitle>
        <S.ShipMemberCount>1 / 10</S.ShipMemberCount>
      </S.Container>
    </S.Wrap>
  );
}
