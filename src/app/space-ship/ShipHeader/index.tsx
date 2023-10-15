import * as S from "./index.styled";

interface SpaceShipType {
  planetTitle: string;
}

export default function ShipHeader({ planetTitle }: SpaceShipType) {
  return (
    <S.Wrap>
      <S.Button>
        <img src="/assets/img/icons/prev-white.svg" height={24} />
      </S.Button>
      <S.PlanetTitle>{planetTitle}</S.PlanetTitle>
      <S.ShareButton>
        <span>탑승링크</span>
        <img src="/assets/img/icons/share-white.svg" height={16} />
      </S.ShareButton>
    </S.Wrap>
  );
}
