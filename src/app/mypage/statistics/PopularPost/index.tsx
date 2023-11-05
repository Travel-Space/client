import PostItem from "./PostItem";

import * as S from "./index.styled";

export default function PopularPost() {
  return (
    <S.Table>
      <S.TableHeader>
        <tr>
          <S.TdTitle>
            <div>인기글</div>
          </S.TdTitle>
          <S.TdLeft></S.TdLeft>
          <S.TdCenter>월간 조회수</S.TdCenter>
          <S.TdCenter>행성</S.TdCenter>
          <S.TdCenter>작성일</S.TdCenter>
        </tr>
      </S.TableHeader>
      <S.Tablebody>
        <PostItem ranking={1} />
      </S.Tablebody>
    </S.Table>
  );
}
