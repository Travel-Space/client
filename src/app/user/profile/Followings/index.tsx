import axiosRequest from "@/api";
import { ResData, FollowingsType, FollowersType } from "@/@types";

import { useRecoilState } from "recoil";
import { followingState, totalFollowingsState, totalFollowersState } from "@/recoil/atoms/friend.atom";

import { useState, useEffect, useRef } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import * as S from "./index.styled";

import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";
import MESSAGE from "@/constants/message";

const Followings = ({ id }: { id: number }) => {
  const [followings, setFollowings] = useRecoilState(followingState);
  const [totalFollowings, setTotalFollowings] = useRecoilState(totalFollowingsState);
  const [totalFollowers, setTotalFollowers] = useRecoilState(totalFollowersState);

  const limit = 10;
  const [page, setPage] = useState(1);
  const [disableLoadData, setDisableLoadDate] = useState(false);

  const updateData = async () => {
    // console.log("updateDataPage", page);
    await updateFollowings(1, (page - 1) * limit);
    getFollowers();
  };

  //팔로잉 업데이트(팔로우 또는 언팔로우 후)
  const updateFollowings = async (page: number, limit: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<FollowingsType>>(
        "get",
        `/user/other/${id}/following?page=${page}&limit=${limit}`,
      );
      const followings = response.data.data;
      const total = response.data.total;

      setTotalFollowings(total);
      setFollowings(followings);
      // console.log("updateFollowings", page, followings);
    } catch (error) {
      console.error("팔로잉 정보를 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  //팔로잉 조회
  const getFollowings = async (page: number, limit: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<FollowingsType>>(
        "get",
        `/user/other/${id}/following?page=${page}&limit=${limit}`,
      );
      const followings = response.data.data;
      const total = response.data.total;
      setTotalFollowings(total);

      //더이상 불러올 데이터가 없을 경우
      if (!followings.length) {
        !total && setFollowings(followings);
        setDisableLoadDate(true);
        return;
      }

      if (page === 1) setFollowings(followings);
      else setFollowings(prev => [...prev, ...followings]);

      setPage(prev => prev + 1);
      // console.log("getFollowings", page, followings);
    } catch (error) {
      console.error("팔로잉 정보를 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  //팔로워 조회
  const getFollowers = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<FollowersType>>(
        "get",
        `/user/other/${id}/followers?page=1&limit=1`,
      );
      const total = response.data.total;

      setTotalFollowers(total);
    } catch (error) {
      console.error("팔로워 정보를 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  //무한 스크롤
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadData = () => {
    // console.log("loadData", page, followings);
    if (disableLoadData) return;
    getFollowings(page, limit);
  };

  const { setTargetRef } = useInfiniteScroll(loadData, [page]);

  useEffect(() => {
    if (observerRef.current) {
      setTargetRef(observerRef);
    }
  }, [observerRef, setTargetRef]);

  return (
    <>
      {!totalFollowings ? (
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
        <S.Container>
          <S.MyFriends>
            {followings.map((el, idx) => (
              <Person key={`following${idx}`} data={el.friend} isMutual={el.isFollowing} updateData={updateData} />
            ))}
          </S.MyFriends>
        </S.Container>
      )}
      <S.InfiniteScrollTarget ref={observerRef} />
    </>
  );
};

export default Followings;
