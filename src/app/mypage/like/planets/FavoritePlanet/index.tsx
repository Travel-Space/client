import { LikedPlanet } from "@/@types";

import * as S from "./index.styled";
import PLANETSHAPE from "@/constants/planetShape";

import Image from "next/image";
import LikeCancelBtn from "@/app/mypage/like/LikeCancelBtn";

interface FavoritePlanetProps {
  data: LikedPlanet;
  setPlanets: (planets: LikedPlanet[]) => void;
}
export default function FavoritePlanet({ data, setPlanets }: FavoritePlanetProps) {
  return (
    <S.Container>
      <Image src={PLANETSHAPE[data.planet.shape]} alt="planet" width={60} height={60} />
      <S.Info>
        <S.InfoRow>
          <S.InfoRowCol>
            <S.Name>{data.planet.name}</S.Name>
            <S.People>
              {/* 멤버추가되면 수정예정 */}
              {data.planet.id}/{data.planet.memberLimit}
            </S.People>
          </S.InfoRowCol>
        </S.InfoRow>
        <S.TagList>
          {data.planet.hashtags.map((el: string, idx: number) => (
            <S.Tag key={`hastag${idx}`}>#{el}</S.Tag>
          ))}
        </S.TagList>
      </S.Info>
      <LikeCancelBtn item="planet" setPlanets={setPlanets} id={data.planet.id} />
    </S.Container>
  );
}
