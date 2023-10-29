import * as S from "./index.styled";

import Image from "next/image";
import LikeCancelBtn from "@/app/mypage/like/LikeCancelBtn";

export default function FavoritePlanet() {
  return (
    <S.Container>
      <Image src="/assets/img/icons/planet-0.svg" alt="planet" width={60} height={60} />
      <S.Info>
        <S.InfoRow>
          <S.InfoRowCol>
            <S.Title>목성 미쳤다 목성</S.Title>
            <S.People>1/15</S.People>
          </S.InfoRowCol>
        </S.InfoRow>
        <S.TagList>
          <S.Tag>#일본일본일본</S.Tag>
          <S.Tag>#일본일본일본</S.Tag>
          <S.Tag>#일본일본일본</S.Tag>
          <S.Tag>#일본일본일본</S.Tag>
          <S.Tag>#일본일본일본</S.Tag>
        </S.TagList>
      </S.Info>
      <LikeCancelBtn />
    </S.Container>
  );
}
