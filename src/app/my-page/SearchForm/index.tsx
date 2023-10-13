import * as S from "./index.styled";
import Image from "next/image";

export default function SearchForm() {
  return (
    <S.Search>
      <S.Filter>글제목 ▾</S.Filter>
      <S.VerticalDivider />
      <S.SearchInput type="text" placeholder={`게시글 관리에서 검색합니다.`} />
      <S.SearchBtn>
        <Image src="/assets/img/icons/search-black.svg" alt="search" width={14} height={14} />
      </S.SearchBtn>
    </S.Search>
  );
}
