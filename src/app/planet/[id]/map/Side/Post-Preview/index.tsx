import Link from "next/link";

import { getDateInfo } from "@/utils/getDateInfo";
import { ArticleProps } from "../../page";

import * as S from "./index.styled";
import UserProfile from "@/components/common/UserProfile";

const previewImg = "/assets/img/icons/post-test-img.svg";

export default function PostPreview({ article, params }: ArticleProps) {
  const { id, title, content, createdAt, author } = article;

  // 날짜와 프로필 이미지
  const { dateString } = getDateInfo(createdAt);

  return (
    <S.Container>
      <Link href={{ pathname: `/planet/${params}/post`, query: { detail: `${id}` } }}>
        <S.Post id={id}>
          <S.MainBox>
            <UserProfile size="chat" author={author} />

            <S.Description>
              <span>{title}</span>
              <div>{content}</div>
            </S.Description>

            <S.Date>{dateString}</S.Date>
          </S.MainBox>

          <S.PreviewImg src={previewImg} alt="프리뷰 이미지" />
        </S.Post>
      </Link>
    </S.Container>
  );
}
