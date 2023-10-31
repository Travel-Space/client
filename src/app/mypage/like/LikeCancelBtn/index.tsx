import axiosRequest from "@/api";
import { ResData, Posting, Planet, CancelLikePlanet } from "@/@types";

import * as S from "./index.styled";

interface LikeCancelBtnProps {
  item: string;
  id: number;
  setPostings?: (items: Posting[]) => void;
  setPlanets?: (items: Planet[]) => void;
}
export default function LikeCancelBtn({ item, id, setPostings, setPlanets }: LikeCancelBtnProps) {
  async function getPostings() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("get", `/articles/my/likes`);
      const postings = response.data;
      setPostings && setPostings(postings);
      console.log("likedpostings", postings);
    } catch (error) {
      alert("게시글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }
  async function getPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet[]>>("get", `/planet/my/bookmarks`);
      const planets = response.data;
      setPlanets && setPlanets(planets);
      console.log("likedplanets", planets);
    } catch (error) {
      alert("게시글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }
  async function cancelLikePost() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("delete", `/articles/${id}/like`);
      console.log("cancelLikePost", response.data);
    } catch (error) {
      alert("좋아요 취소 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }
  async function cancelLikePlanet() {
    try {
      const response = await axiosRequest.requestAxios<ResData<CancelLikePlanet>>("delete", `/planet/${id}/bookmark`);
      console.log("cancelLikePlanets", response.data);
    } catch (error) {
      alert("좋아요 취소 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }
  const handleClick = async () => {
    if (item === "planet") {
      await cancelLikePlanet();
      getPlanets();
    } else {
      await cancelLikePost();
      getPostings();
    }
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
