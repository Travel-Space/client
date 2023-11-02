import { Planet } from "@/@types";

import * as S from "./index.styled";
import PLANETSHAPE from "@/constants/planetShape";

import Image from "next/image";
import LikeCancelBtn from "@/app/mypage/like/LikeCancelBtn";

interface FavoritePlanetProps {
  data: Planet;
  setPlanets: (planets: Planet[]) => void;
}
export default function FavoritePlanet({ data, setPlanets }: FavoritePlanetProps) {
  return (
    <S.Container>
      <Image src={PLANETSHAPE[data.shape]} alt="planet" width={60} height={60} />
      <S.Info>
        <S.InfoRow>
          <S.InfoRowCol>
            <S.Name>{data.name}</S.Name>
            <S.People>
              {data.memberCount}/{data.memberLimit}
            </S.People>
          </S.InfoRowCol>
        </S.InfoRow>
        <S.TagList>
          {data.hashtags.map((el: string, idx: number) => (
            <S.Tag key={`hastag${idx}`}>#{el}</S.Tag>
          ))}
        </S.TagList>
      </S.Info>
      <LikeCancelBtn item="planet" setPlanets={setPlanets} id={data.id} />
    </S.Container>
  );
}
