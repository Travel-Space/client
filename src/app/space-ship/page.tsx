"use client";

import ShipHeader from "./ShipHeader";
import ShipsSettings from "./ShipSettings";
import ShipList from "./ShipList";
import * as S from "./page.styled";

export default function SpaceShip() {
  return (
    <S.Wrap>
      <ShipHeader planetTitle="일본 여행 맛도리" />
      <ShipList />
      <ShipsSettings />
    </S.Wrap>
  );
}
