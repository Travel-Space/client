import { Planet } from "@/@types/Planet";
import PLANETSHAPE from "@/constants/planetShape";
import Image from "next/image";

import * as S from "./index.styled";

interface TravelingPlanetProps {
  data: Planet;
}
export default function TravelingPlanet({ data }: TravelingPlanetProps) {
  const { name, hashtags, memberLimit, published, shape, members } = data;
  return (
    <S.Container>
      <Image src={PLANETSHAPE[shape]} alt="planet" width={60} height={60} />
      <S.Info>
        <S.InfoRow>
          <S.InfoRowCol>
            <S.Title>{name}</S.Title>
            {/* 멤버수 추가되면 수정예정 */}
            <S.People>
              {members ? members.length : 1}/{memberLimit ? memberLimit : 15}
            </S.People>
          </S.InfoRowCol>
          {/* 롤 추가되면 수정예정 */}
          <S.Position>부관리자</S.Position>
        </S.InfoRow>
        <S.TagList>{hashtags?.map((el, idx) => <S.Tag key={idx}>{el}</S.Tag>)}</S.TagList>
      </S.Info>
      {!published && <Image src="/assets/img/icons/lock.svg" alt="lock" width={24} height={24} />}
    </S.Container>
  );
}
