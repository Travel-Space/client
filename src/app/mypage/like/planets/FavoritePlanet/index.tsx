import { Planet, PlanetBookmark } from "@/@types";

import { useRouter } from "next/navigation";

import * as S from "./index.styled";
import PLANETSHAPE from "@/constants/planetShape";

import Image from "next/image";
import LikeCancelBtn from "@/app/mypage/like/LikeCancelBtn";

interface FavoritePlanetProps {
  data: PlanetBookmark;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  saveData: (totalCount: number, totalPage: number, planets: Planet[]) => void;
}
export default function FavoritePlanet({ data, page, setPage, saveData }: FavoritePlanetProps) {
  const { planet, planetId } = data;

  const router = useRouter();

  const goToPlanet = () => {
    router.push(`/planet/${planetId}/map/`);
  };
  const goToShip = () => {
    router.push(`/planet/${planetId}/space-ship/`);
  };
  return (
    <S.Container>
      <Image src={PLANETSHAPE[planet.shape]} alt="planet" width={60} height={60} onClick={goToPlanet} />
      <S.Info>
        <S.InfoRow>
          <S.InfoRowCol>
            <S.Name onClick={goToPlanet}>{planet.name}</S.Name>
            <div>
              {planet.published ? (
                <Image src="/assets/img/icons/unlock.svg" alt="lock" width={20} height={20} />
              ) : (
                <Image src="/assets/img/icons/lock.svg" alt="lock" width={20} height={20} />
              )}
            </div>
            <S.People onClick={goToShip}>
              {planet.memberCount}/{planet.memberLimit}
            </S.People>
          </S.InfoRowCol>
        </S.InfoRow>
        <S.TagList>
          {planet.hashtags.map((el, idx) => (
            <S.Tag key={`hastag${idx}`}>#{el}</S.Tag>
          ))}
        </S.TagList>
      </S.Info>
      <LikeCancelBtn item="planet" id={planet.id} saveData={saveData} page={page} setPage={setPage} />
    </S.Container>
  );
}
