import { Posting } from "@/@types";

import * as S from "./index.styled";

import PostingItem from "@/components/User/PostingItem";

const Postings = ({ data }: { data: Posting[] }) => {
  return (
    <S.Container>
      <S.Number>
        총 <span>{data.length}</span>개의 게시글
      </S.Number>
      <S.Content>
        {data.map((el, idx) => (
          <PostingItem key={`user-post${idx}`} data={el} />
        ))}
      </S.Content>
    </S.Container>
  );
};

export default Postings;
