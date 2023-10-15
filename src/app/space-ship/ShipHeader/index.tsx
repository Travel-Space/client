import * as S from "./index.styled";

export default function ShipHeader() {
  return (
    <S.Wrap>
      <S.Button>
        <img src="/assets/img/icons/prev-white.svg" height={24} />
      </S.Button>
      <S.PlanetTitle>일본 맛도리 여행</S.PlanetTitle>
      <S.ShareButton>
        <span>탑승링크</span>
        <img src="/assets/img/icons/share-white.svg" height={16} />
      </S.ShareButton>
    </S.Wrap>
  );
}
