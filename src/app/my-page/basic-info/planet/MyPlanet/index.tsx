import Image from "next/image";

import * as S from "./index.styled";

export default function MyPlanet() {
  return (
    <S.Container>
      <S.Header>
        <S.People>10/100</S.People>
        <Image src="/assets/img/icons/lock.svg" alt="lock" width={20} height={20} />
      </S.Header>
      <Image src="/assets/img/icons/planet-0.svg" alt="lock" width={96} height={96} />

      <S.Title>영국 맛도리 여행</S.Title>
    </S.Container>
  );
}
