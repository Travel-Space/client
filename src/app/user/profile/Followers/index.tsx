import axiosRequest from "@/api";
import { ResData, FollowingsType, FollowersType } from "@/@types";

import { useRecoilState } from "recoil";
import { followerState, totalFollowingsState, totalFollowersState } from "@/recoil/atoms/friend.atom";

import { useState, useEffect, useRef } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import * as S from "./index.styled";

import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";
import MESSAGE from "@/constants/message";

export default function Followers({ id }: { id: number }) {
  const [followers, setFollowers] = useRecoilState(followerState);
  const [totalFollowers, setTotalFollowers] = useRecoilState(totalFollowersState);

  const [totalFollowings, setTotalFollowings] = useRecoilState(totalFollowingsState);

  const limit = 10;
  const [page, setPage] = useState(1);
  const [disableLoadData, setDisableLoadDate] = useState(false);

  const updateData = () => {
    getFollowings();
    getFollowers(1, page * limit);
  };

  //팔로잉 조회
  async function getFollowings() {
    try {
      const response = await axiosRequest.requestAxios<ResData<FollowingsType>>(
        "get",
        `/user/other/${id}/following?page=${1}&limit=${1}`,
      );
      const total = response.data.total;
      setTotalFollowings(total);

      // console.log("followings", followings);
      // console.log("page", page);
    } catch (error) {
      console.error("팔로잉 정보를 가져오는중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  }
  //팔로워 조회
  async function getFollowers(page: number, limit: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<FollowersType>>(
        "get",
        `/user/other/${id}/followers?page=${page}&limit=${limit}`,
      );
      const followers = response.data.data;
      const total = response.data.total;
      setTotalFollowers(total);

      if (!followers.length) {
        setDisableLoadDate(true);
        return;
      }

      if (page === 1) setFollowers(followers);
      else setFollowers(prev => [...prev, ...followers]);
      setPage(prev => prev + 1);
      console.log("page", page);
    } catch (error) {
      alert("팔로워 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followers data: ", error);
    }
  }
  useEffect(() => {
    getFollowers(page, limit);
    getFollowings();
  }, []);

  //무한 스크롤
  const loadData = () => {
    if (disableLoadData) return;
    getFollowers(page, limit);
  };

  const { setTargetRef } = useInfiniteScroll(loadData, [page]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      setTargetRef(observerRef);
    }
  }, [observerRef, setTargetRef]);

  return (
    <>
      {followers.length === 0 ? (
        <Nothing
          src="/assets/img/icons/no-friends.svg"
          alt="no-friends"
          width={216}
          height={216}
          comment="등록된 친구가 없습니다."
          suggest="닉네임 또는 계정을 검색해 보세요."
          font="lg"
        />
      ) : (
        <S.MyFriendsWrap>
          <S.MyFriends>
            {followers.map((el, idx) => (
              <Person key={`following${idx}`} data={el.user} isMutual={el.isMutual} updateData={updateData} />
            ))}
          </S.MyFriends>
          <S.InfiniteScrollTarget ref={observerRef} />
        </S.MyFriendsWrap>
      )}
    </>
  );
}
