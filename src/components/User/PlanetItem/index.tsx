import { Planet } from "@/@types/Planet";

import { useRouter } from "next/navigation";

import * as S from "./index.styled";

import Image from "next/image";
import PLANETSHAPE from "@/constants/planetShape";
import ROLE from "@/constants/role";

interface PlanetItemProps {
  data: Planet;
  userId?: number;
}
export default function PlanetItem({ data, userId }: PlanetItemProps) {
  const { name, hashtags, memberLimit, published, shape, members } = data;
  const userRole = members.find(el => el.userId == userId)?.role;

  const router = useRouter();
  const goToPlanet = () => {
    router.push(`/planet/${data.id}/map/`);
  };
  const goToShip = () => {
    router.push(`/planet/${data.id}/space-ship/`);
  };
  return (
    <S.Container>
      <Image src={PLANETSHAPE[shape]} alt="planet" width={60} height={60} onClick={goToPlanet} />
      <S.Info>
        <S.InfoRow>
          <S.InfoRowCol>
            <S.Title onClick={goToPlanet}>{name}</S.Title>
            <S.People onClick={goToShip}>
              {members ? members.length : 1}/{memberLimit ? memberLimit : 15}
            </S.People>
          </S.InfoRowCol>
          <S.Position>{userRole && ROLE[userRole]}</S.Position>
        </S.InfoRow>
        <S.TagList>{hashtags?.map((el, idx) => <S.Tag key={idx}>{el}</S.Tag>)}</S.TagList>
      </S.Info>
      {published ? (
        <Image src="/assets/img/icons/unlock.svg" alt="lock" width={24} height={24} />
      ) : (
        <Image src="/assets/img/icons/lock.svg" alt="lock" width={24} height={24} />
      )}
    </S.Container>
  );
}
