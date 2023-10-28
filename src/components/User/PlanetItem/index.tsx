import { Planet } from "@/@types/Planet";
import PLANETSHAPE from "@/constants/planetShape";
import ROLE from "@/constants/role";

import { useRecoilValue } from "recoil";
import { profileState } from "@/recoil/atoms/user.atom";

import * as S from "./index.styled";

import Image from "next/image";

interface PlanetItemProps {
  data: Planet;
}
export default function PlanetItem({ data }: PlanetItemProps) {
  const profile = useRecoilValue(profileState);
  const { name, hashtags, memberLimit, published, shape, members } = data;
  return (
    <S.Container>
      <Image src={PLANETSHAPE[shape]} alt="planet" width={60} height={60} />
      <S.Info>
        <S.InfoRow>
          <S.InfoRowCol>
            <S.Title>{name}</S.Title>
            <S.People>
              {members ? members.length : 1}/{memberLimit ? memberLimit : 15}
            </S.People>
          </S.InfoRowCol>
          <S.Position>{members.map(el => profile?.id === el.userId && ROLE[el.role])}</S.Position>
        </S.InfoRow>
        <S.TagList>{hashtags?.map((el, idx) => <S.Tag key={idx}>{el}</S.Tag>)}</S.TagList>
      </S.Info>
      {!published && <Image src="/assets/img/icons/lock.svg" alt="lock" width={24} height={24} />}
    </S.Container>
  );
}
