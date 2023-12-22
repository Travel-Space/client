import { Posting } from "@/@types";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { getDateInfo } from "@/utils/getDateInfo";

import * as S from "./index.styled";

import Image from "next/image";
import LikeCancelBtn from "@/app/mypage/like/LikeCancelBtn";

interface PostingItemProps {
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  data: Posting;
  saveData?: (totalCount: number, totalPage: number, post: Posting[]) => void;
}
export default function PostingItem({ page, setPage, data, saveData }: PostingItemProps) {
  //local날짜로 변환
  const { dateString, dayName } = getDateInfo(data.createdAt);

  const router = useRouter();
  const pathname = usePathname();
  const parentPath = pathname.split("/")[2];

  const goToPlanet = () => {
    router.push(`/planet/${data.planetId}/map/`);
  };
  const goToPost = () => {
    router.push(`/planet/${data.planetId}/post/?detail=${data.id}`);
  };
  return (
    <S.Container>
      <S.InfoRow>
        <S.InfoRowCol>
          <S.Planet onClick={goToPlanet}>{data.planet.name}</S.Planet>
          <S.Likes>
            <S.Heart>
              <Image src="/assets/img/icons/red-heart.svg" alt="likes" width={10} height={8.61} />
            </S.Heart>
            <span>{data.likes.length}</span>
          </S.Likes>
        </S.InfoRowCol>
        <S.CreatedDate>
          {` ${dateString}
           ${dayName}`}
        </S.CreatedDate>
      </S.InfoRow>
      <S.InfoRow>
        <S.Title onClick={goToPost}>{data.title}</S.Title>
        {parentPath === "like" && saveData && page && setPage && (
          <LikeCancelBtn item="posting" saveData={saveData} id={data.id} page={page} setPage={setPage} />
        )}
      </S.InfoRow>
    </S.Container>
  );
}
