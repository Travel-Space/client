import { useState } from "react";
import useDetectClose from "@/hooks/useDetectClose";

import Image from "next/image";
import * as S from "./index.styled";

export default function DropDown() {
  const [isOpen, dropDownRef, handler] = useDetectClose(false);

  const [planetName, setPlanetName] = useState("행성 선택");

  const selectPlanet = (evt: React.MouseEvent) => {
    const eventTarget = evt.target as HTMLElement;
    setPlanetName(eventTarget.innerText);
  };

  return (
    <div>
      <S.Default onClick={handler} ref={dropDownRef}>
        <div>{planetName}</div>
        <Image src="/assets/img/icons/down.svg" alt="down" width={8} height={8} />
      </S.Default>
      <S.PlanetListWrap isDropped={isOpen}>
        <S.PlanetList onClick={selectPlanet}>일본 맛도리 여행</S.PlanetList>
        <S.PlanetList onClick={selectPlanet}>태국 맛도리 여행</S.PlanetList>
        <S.PlanetList onClick={selectPlanet}>호주 맛도리 여행</S.PlanetList>
        <S.PlanetList onClick={selectPlanet}>중국 맛도리 여행</S.PlanetList>
        <S.PlanetList onClick={selectPlanet}>베트남 맛도리 여행</S.PlanetList>
      </S.PlanetListWrap>
    </div>
  );
}
