import { useState, useEffect } from "react";

import * as S from "./index.styled";

const sliceArrayByLimit = (totalPage: number, limit: number): number[][] => {
  const totalPageArray = Array(totalPage)
    .fill(null)
    .map((_, i) => i);
  return Array(Math.ceil(totalPage / limit))
    .fill(null)
    .map(() => totalPageArray.splice(0, limit));
};

interface PaginationProps {
  totalPage: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination = ({ totalPage, limit, page, setPage }: PaginationProps) => {
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
    console.log("currentFirstPage", currentFirstPage);
    console.log("page", page);
    console.log("limit", limit);
  }, [page]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage]);

  const currentFirstPage = page % limit === 0 ? page - limit + 1 : page - (page % limit) + 1;
  const LastFirstPage = totalPage % limit === 0 ? totalPage - limit + 1 : totalPage - (totalPage % limit) + 1;

  return (
    <S.PaginationWrapper>
      <S.FaAngleLeft onClick={() => setPage(currentFirstPage - limit)} disabled={page <= limit} />
      <S.ButtonWrapper>
        {currentPageArray?.map(i => (
          <S.PageButton key={i + 1} onClick={() => setPage(i + 1)} active={page === i + 1}>
            {i + 1}
          </S.PageButton>
        ))}
      </S.ButtonWrapper>
      <S.FaAngleRight onClick={() => setPage(currentFirstPage + limit)} disabled={LastFirstPage === currentFirstPage} />
    </S.PaginationWrapper>
  );
};

export default Pagination;
