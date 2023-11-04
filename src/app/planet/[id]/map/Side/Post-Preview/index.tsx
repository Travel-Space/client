import Link from "next/link";

import { getDateInfo } from "@/utils/getDateInfo";
import { ArticleProps } from "../../page";

import * as S from "./index.styled";
import UserProfile from "@/components/common/UserProfile";

export default function PostPreview({ article, params }: ArticleProps) {
  const { id, title, content, createdAt, author, images } = article;

  // 날짜와 프로필 이미지
  const { dateString } = getDateInfo(createdAt);

  return (
    <S.Container>
      <Link href={{ pathname: `/planet/${params}/post`, query: { detail: `${id}` } }}>
        <S.Post key={id}>
          <S.MainBox>
            <UserProfile size="map" author={author} />

            <S.Description>
              <span>{title}</span>
              <div dangerouslySetInnerHTML={{ __html: content || "" }} />
            </S.Description>

            <S.Date>{dateString}</S.Date>
          </S.MainBox>

          {!!images.length && <S.PreviewImg src={images[0].url} alt="프리뷰 이미지" />}
        </S.Post>
      </Link>
    </S.Container>
  );
}
