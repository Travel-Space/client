import axiosRequest from "@/api";
import { ResData, FollowingsType, FollowersType } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { followingState, totalFollowersState, totalFollowingsState } from "@/recoil/atoms/friend.atom";

import * as S from "./index.styled";

import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";

export default function Followings() {
  //useMoreButton
  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  const [followings, setFollowings] = useRecoilState(followingState);

  const [totalFollowers, setTotalFollowers] = useRecoilState(totalFollowersState);
  const [totalFollowings, setTotalFollowings] = useRecoilState(totalFollowingsState);

  const [page, setPage] = useState(1);
  const limit = 5;

  //팔로잉 조회
  async function getFollowings(page: number, limit: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<FollowingsType>>(
        "get",
        `/user/following?page=${page}&limit=${limit}`,
      );
      const followings = response.data.data;
      const total = response.data.total;

      if (page === 1) setFollowings(followings);
      else setFollowings(prev => [...prev, ...followings]);

      setTotalFollowings(total);
      // console.log("followings", followings);
    } catch (error) {
      alert("팔로잉 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followings data: ", error);
    }
  }
  //팔로워 조회
  async function getFollowers() {
    try {
      const response = await axiosRequest.requestAxios<ResData<FollowersType>>(
        "get",
        `/user/followers?page=${1}&limit=${1}`,
      );

      const total = response.data.total;

      setTotalFollowers(total);
      // console.log("followings", response.data);
    } catch (error) {
      alert("팔로워 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followers data: ", error);
    }
  }

  const updateData = () => {
    getFollowings(1, page * limit);
    getFollowers();
  };

  useEffect(() => {
    // console.log("page", page);

    getFollowings(page, limit);
  }, [page]);

  useEffect(() => {
    getFollowings(page, limit);
    getFollowers();
  }, []);

  return (
    <>
      {followings.length === 0 ? (
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
        <>
          <S.MyFriendsWrap>
            <S.MyFriends>
              {followings.map((el, idx) => (
                <Person key={`following${idx}`} data={el.friend} updateData={updateData} />
              ))}
            </S.MyFriends>
          </S.MyFriendsWrap>
          <S.ShowMoreBtn onClick={handleClick} disabled={followings.length === totalFollowings}>
            목록 더보기
          </S.ShowMoreBtn>
        </>
      )}
    </>
  );
}
