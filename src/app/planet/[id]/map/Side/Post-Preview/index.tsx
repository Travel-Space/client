import { ArticleProps } from "..";

import * as S from "./index.styled";
import UserProfile from "@/components/common/UserProfile";

const previewImg = "/assets/img/icons/post-test-img.svg";

export default function PostPreview({ article }: ArticleProps) {
  const { id, title, content, createdAt, author } = article;

  return (
    <S.Post id={id}>
      <S.MainBox>
        <UserProfile size="chat" author={author} />

        <S.Description>
          <span>{title}</span>
          <div>{content}</div>
        </S.Description>

        <S.Date>{createdAt}</S.Date>
      </S.MainBox>

      <S.PreviewImg src={previewImg} alt="프리뷰 이미지" />
    </S.Post>
  );
}
