import * as S from "./index.styled";
import Image from "next/image";

import Divider from "@/app/mypage/Divider";

export default function SearchForm() {
  return (
    <S.Search>
      <S.Filter>글제목 ▾</S.Filter>
      <Divider width="1px" height="12px" />
      <S.SearchInput type="text" placeholder={`게시글 관리에서 검색합니다.`} />
      <S.SearchBtn>
        <Image src="/assets/img/icons/search-black.svg" alt="search" width={14} height={14} />
      </S.SearchBtn>
    </S.Search>
  );
}
