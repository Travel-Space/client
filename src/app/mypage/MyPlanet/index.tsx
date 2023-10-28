import { Planet } from "@/@types/Planet";

import { usePathname } from "next/navigation";

import PLANETSHAPE from "@/constants/planetShape";

import * as S from "./index.styled";

import Image from "next/image";

interface MyPlanetProps {
  data: Planet;
}
export default function MyPlanet({ data }: MyPlanetProps) {
  const { name, memberLimit, published, shape, planetBookMark, members } = data;

  //좋아요페이지인지 확인
  const pathname = usePathname();
  const parentPath = pathname.split("/")[2];

  return (
    <S.Container>
      <S.Header>
        <S.People>
          {/* 멤버수 추가되면 수정예정 */}
          {members ? members.length : 1}/{memberLimit ? memberLimit : 15}
        </S.People>
        {!published && <Image src="/assets/img/icons/lock.svg" alt="lock" width={20} height={20} />}
      </S.Header>
      <Image src={PLANETSHAPE[shape]} alt="planet" width={96} height={96} />
      {/* 행성좋아요 추가되면 수정예정 */}
      {parentPath === "like" && (
        <S.Likes>
          <Image src="/assets/img/icons/white-heart.svg" alt="heart" width={15} height={15} />
          {/* 행성좋아요 추가되면 수정예정 */}
          <S.Number>{planetBookMark ? planetBookMark.length : 100}</S.Number>
        </S.Likes>
      )}
      <S.Title>{name}</S.Title>
    </S.Container>
  );
}
