import { Posting } from "@/@types";

import { usePathname } from "next/navigation";

import { getDateInfo } from "@/utils/getDateInfo";

import * as S from "./index.styled";

import Image from "next/image";
import LikeCancelBtn from "@/app/mypage/like/LikeCancelBtn";

interface PostingItemProps {
  page: number;
  setPage: (page: number) => void;
  data: Posting;
  saveData: (totalCount: number, totalPage: number, post: Posting[]) => void;
}
export default function PostingItem({ page, setPage, data, saveData }: PostingItemProps) {
  //local날짜로 변환
  const { dateString, dayName } = getDateInfo(data.createdAt);

  //좋아요페이지인지 확인
  const pathname = usePathname();
  const parentPath = pathname.split("/")[2];

  return (
    <S.Container>
      <S.InfoRow>
        <S.InfoRowCol>
          <S.Planet>{data.planet.name}</S.Planet>
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
        <S.Title>{data.title}</S.Title>
        {parentPath === "like" && (
          <LikeCancelBtn item="posting" saveData={saveData} id={data.id} page={page} setPage={setPage} />
        )}
      </S.InfoRow>
    </S.Container>
  );
}
