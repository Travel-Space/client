import axiosRequest from "@/api";
import { ResData, Posting } from "@/@types";

import * as S from "./index.styled";

interface LikeCancelBtnProps {
  articleId: number;
  setPostings: (postings: Posting[]) => void;
}
export default function LikeCancelBtn({ articleId, setPostings }: LikeCancelBtnProps) {
  async function getPostings() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("get", `/articles/my/likes`);
      const postings = response.data;
      setPostings(postings);
      // console.log("postings", postings);
    } catch (error) {
      alert("게시글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }

  async function cancelLike() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("delete", `/articles/${articleId}/like`);
      // console.log("postings", postings);
    } catch (error) {
      alert("좋아요 취소 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }
  const handleClick = async () => {
    console.log(articleId);
    await cancelLike();
    getPostings();
  };
  return (
    <S.Button onClick={handleClick}>
      <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <S.Path
          d="M0 5.77887C0 10.5812 4.02 13.1398 6.962 15.4308C8 16.2386 9 17 10 17C11 17 12 16.2396 13.038 15.4299C15.981 13.1408 20 10.5812 20 5.77985C20 0.97757 14.5 -2.42837 10 2.18925C5.5 -2.42936 0 0.976583 0 5.77887Z"
          fill="#FF3636"
        />
      </svg>
    </S.Button>
  );
}
