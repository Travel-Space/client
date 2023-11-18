import axiosRequest from "@/api/index";
import { ResData, PostingsType, Posting } from "@/@types";

import { useState, useEffect, useRef } from "react";

import * as S from "./index.styled";

import PostingItem from "@/components/User/PostingItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Nothing from "@/components/common/Nothing";
import MESSAGE from "@/constants/message";

const Postings = ({ id }: { id: number }) => {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const [disableLoadData, setDisableLoadDate] = useState(false);

  //게시글 불러오기
  const getPostings = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PostingsType>>(
        "get",
        `/articles/other/${id}/articles?page=${page}&limit=10`,
      );
      const postings = response.data.data;
      const totalCount = response.data.totalCount;
      setTotalCount(totalCount);

      if (!postings.length) {
        setDisableLoadDate(true);
        return;
      }

      if (page === 1) setPostings(postings);
      else setPostings(prev => [...prev, ...postings]);

      setPage(prev => prev + 1);

      // console.log("Postings", postings);
      // console.log("page", page);
    } catch (error) {
      console.error("게시글 정보를 가져오는중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  const loadData = () => {
    if (disableLoadData) return;
    getPostings();
    // console.log(page, "page");
    // console.log(postings, "postings");
  };

  const { setTargetRef } = useInfiniteScroll(loadData, [page]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      setTargetRef(observerRef);
    }
  }, [observerRef, setTargetRef]);
  useEffect(() => {
    getPostings();
  }, []);

  return (
    <S.Container>
      {!!totalCount ? (
        <>
          <S.Number>
            총 <span>{totalCount}</span>개의 게시글
          </S.Number>
          <S.Content>
            {postings.map((el, idx) => (
              <PostingItem key={`user-post${idx}`} data={el} />
            ))}
          </S.Content>
        </>
      ) : (
        <Nothing
          src="/assets/img/icons/no-postings.svg"
          alt="no-postings"
          width={96}
          height={96}
          comment="작성된 게시글이 없습니다."
          font="lg"
        />
      )}
      <S.InfiniteScrollTarget ref={observerRef} />
    </S.Container>
  );
};

export default Postings;
