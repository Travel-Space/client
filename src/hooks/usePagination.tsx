import { useState, useEffect } from "react";

export default function usePagination(loadData: () => void, setData: (data: any) => void) {
  //pagination
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const saveData = (totalCount: number, totalPage: number, data: any) => {
    setTotalCount(totalCount);
    setTotalPage(totalPage);
    setData(data);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  return { saveData, totalCount, totalPage, page, setPage };
}
