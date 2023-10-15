"use client";

import ShipHeader from "./ShipHeader";
import ShipsSettings from "./ShipSettings";
import Ships from "./Ships";
import * as S from "./page.styled";

export default function SpaceShip() {
  return (
    <S.Wrap>
      <ShipHeader />
      <Ships />
      <ShipsSettings />
    </S.Wrap>
  );
}
