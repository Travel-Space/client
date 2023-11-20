import axiosRequest from "@/api";
import { ResData, Posting, PlanetsType, CancelLikePlanet, PostingsType } from "@/@types";

import { useRecoilState } from "recoil";
import { myPlanetsState } from "@/recoil/atoms/planets.atom";

import * as S from "./index.styled";

import MESSAGE from "@/constants/message";

interface LikeCancelBtnProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  item: string;
  id: number;
  saveData: (totalCount: number, totalPage: number, data: any) => void;
}
export default function LikeCancelBtn({ item, id, saveData, page, setPage }: LikeCancelBtnProps) {
  const [_, setMyPlanets] = useRecoilState(myPlanetsState);

  //좋아요한 게시글 불러오기
  const getPostings = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PostingsType>>(
        "get",
        `/articles/my/likes?page=${page}&limit=10`,
      );
      const postings = response.data.data;
      const totalCount = response.data.totalCount;
      const totalPage = Math.ceil(totalCount / 10);
      saveData(totalCount, totalPage, postings);

      //데이터가 1개 남았을 때 삭제시 이전 페이지로 전환
      postings.length === 0 && page !== 1 && setPage(prev => prev - 1);
      // console.log("totalPage", totalPage);
      // console.log("postings", postings);
    } catch (error) {
      console.error("게시글 정보를 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  //소유한 행성 불러오기
  const getMyPlanets = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PlanetsType>>(
        "get",
        "/planet/my-owned-planets?page=1&limit=5",
      );

      const planets = response.data.data;
      setMyPlanets(planets);
      // console.log("planets", response.data.data);
    } catch (error) {
      console.error("행성 목록을 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  const getPlanets = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PlanetsType>>("get", `/planet/my/bookmarks`);
      const planets = response.data.data;
      const totalCount = response.data.totalCount;
      const totalPage = Math.ceil(totalCount / 10);
      saveData(totalCount, totalPage, planets);

      //데이터가 1개 남았을 때 삭제시 이전 페이지로 전환
      planets.length === 0 && page !== 1 && setPage(prev => prev - 1);
      // console.log("likedplanets", planets);
    } catch (error) {
      console.error("행성 목록을 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  const cancelLikePost = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>("delete", `/articles/${id}/like`);
      // console.log("cancelLikePost", response.data);
    } catch (error) {
      console.error("좋아요 취소 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  const cancelLikePlanet = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<CancelLikePlanet>>("delete", `/planet/${id}/bookmark`);
      // console.log("cancelLikePlanets", response.data);
    } catch (error) {
      console.error("좋아요 취소 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  const handleClick = async () => {
    if (item === "planet") {
      await cancelLikePlanet();
      getPlanets();
      getMyPlanets();
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
