import { Planet } from "@/@types/Planet";

import { usePathname, useRouter } from "next/navigation";

import PLANETSHAPE from "@/constants/planetShape";

import * as S from "./index.styled";

import Image from "next/image";

interface MyPlanetProps {
  data: Planet;
}
export default function MyPlanetItem({ data }: MyPlanetProps) {
  const { id, name, memberLimit, published, shape, planetBookMark, members } = data;

  const approvedMembers = members.filter(v => v.status === "APPROVED");
  const router = useRouter();
  const pathname = usePathname();
  const parentPath = pathname.split("/");

  const goToPlanet = () => {
    parentPath[1] === "user" && router.push(`/planet/${id}/map/`);
    parentPath[1] === "mypage" && router.push(`/planet/${id}/modify/`);
  };

  return (
    <S.Container onClick={goToPlanet}>
      <S.Header>
        <S.People>
          {approvedMembers.length}/{memberLimit ? memberLimit : 15}
        </S.People>
        {published ? (
          <Image src="/assets/img/icons/unlock.svg" alt="lock" width={20} height={20} />
        ) : (
          <Image src="/assets/img/icons/lock.svg" alt="lock" width={20} height={20} />
        )}
      </S.Header>
      <Image src={PLANETSHAPE[shape]} alt="planet" width={96} height={96} />
      {parentPath[2] === "like" && (
        <S.Likes>
          <Image src="/assets/img/icons/white-heart.svg" alt="heart" width={15} height={15} />
          <S.Number>{planetBookMark ? planetBookMark.length : 100}</S.Number>
        </S.Likes>
      )}
      <S.Title>{name}</S.Title>
    </S.Container>
  );
}
