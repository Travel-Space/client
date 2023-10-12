import Image from "next/image";

import * as S from "./index.styled";

export default function NoPlanets() {
  return (
    <S.Container>
      <Image src="/assets/img/icons/no-planets.svg" alt="lock" width={148} height={148} />
      <S.Explanation>여행 중인 행성이 없습니다.</S.Explanation>
    </S.Container>
  );
}
