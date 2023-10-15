import * as S from "./index.styled";

export default function Ship() {
  return (
    <S.Wrap>
      <S.Container>
        <S.CreateShipBtn>
          <img src="/assets/img/icons/ship-profile-create.svg" alt="" />
        </S.CreateShipBtn>
        <S.ShipTitle>우주선 이름</S.ShipTitle>
        <S.ShipMemberCount>1 / 10</S.ShipMemberCount>
      </S.Container>
    </S.Wrap>
  );
}
