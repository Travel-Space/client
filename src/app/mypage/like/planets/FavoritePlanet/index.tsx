import { Planet } from "@/@types";

import { useRouter } from "next/navigation";

import * as S from "./index.styled";
import PLANETSHAPE from "@/constants/planetShape";

import Image from "next/image";
import LikeCancelBtn from "@/app/mypage/like/LikeCancelBtn";

interface FavoritePlanetProps {
  data: Planet;
  page: number;
  setPage: (page: number) => void;
  saveData: (totalCount: number, totalPage: number, planets: Planet[]) => void;
}
export default function FavoritePlanet({ data, page, setPage, saveData }: FavoritePlanetProps) {
  const router = useRouter();

  const goToPlanet = () => {
    router.push(`/planet/${data.id}/map/`);
  };
  return (
    <S.Container>
      <Image src={PLANETSHAPE[data.shape]} alt="planet" width={60} height={60} onClick={goToPlanet} />
      <S.Info>
        <S.InfoRow>
          <S.InfoRowCol>
            <S.Name onClick={goToPlanet}>{data.name}</S.Name>
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
      <LikeCancelBtn item="planet" id={data.id} saveData={saveData} page={page} setPage={setPage} />
    </S.Container>
  );
}
