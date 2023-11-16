import Link from "next/link";

import { getDateInfo } from "@/utils/getDateInfo";
import { ArticleProps } from "..";

import * as S from "./index.styled";
import UserProfile from "@/components/common/UserProfile";

export default function PostPreview({ article, params }: ArticleProps) {
  // 날짜와 프로필 이미지
  const { dateString } = getDateInfo(article!.createdAt);

  return (
    <S.Container>
      <Link href={{ pathname: `/planet/${params}/post`, query: { detail: `${article?.id}` } }}>
        <S.Post key={article?.id}>
          <S.MainBox>
            <UserProfile size="map" author={article?.author} />

            <S.Description>
              <span>{article?.title}</span>
              <div dangerouslySetInnerHTML={{ __html: article?.content || "" }} />
            </S.Description>

            <S.Date>{dateString}</S.Date>
          </S.MainBox>

          {!!article?.images.length && <S.PreviewImg src={article?.images[0].url} alt="프리뷰 이미지" />}
        </S.Post>
      </Link>
    </S.Container>
  );
}
