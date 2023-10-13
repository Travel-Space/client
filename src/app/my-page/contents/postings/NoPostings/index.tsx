import Image from "next/image";

import * as S from "./index.styled";

export default function NoPostings() {
  return (
    <S.Container>
      <Image src="/assets/img/icons/no-postings.svg" alt="lock" width={96} height={96} />
      <S.Explanation>작성된 게시글이 없습니다.</S.Explanation>
    </S.Container>
  );
}
