import axiosRequest from "@/api";
import { ResData, FollowingsType, FollowersType, SearchItem } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { followerState, totalFollowersState, totalFollowingsState } from "@/recoil/atoms/friend.atom";

import * as S from "./index.styled";

import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";

import MESSAGE from "@/constants/message";

const Followers = ({ searchItem }: { searchItem?: SearchItem }) => {
  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  const [followers, setFollowers] = useRecoilState(followerState);

  const [totalFollowers, setTotalFollowers] = useRecoilState(totalFollowersState);
  const [_, setTotalFollowings] = useRecoilState(totalFollowingsState);

  const [page, setPage] = useState(1);
  const limit = 10;

  //팔로잉 조회
  const getFollowings = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<FollowingsType>>(
        "get",
        `/user/following?page=${1}&limit=${1}`,
      );
      const total = response.data.total;

      setTotalFollowings(total);
      // console.log("followings", followings);
    } catch (error) {
      console.error("팔로잉 정보를 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };
  //팔로워 조회
  const getFollowers = async (page: number, limit: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<FollowersType>>(
        "get",
        !searchItem?.content
          ? `/user/followers?page=${page}&limit=${limit}`
          : `/user/followers?page=${page}&limit=${limit}&${searchItem?.selectedMenu}=${searchItem?.content}`,
      );
      const followers = response.data.data;
      const total = response.data.total;

      if (page === 1) setFollowers(followers);
      else setFollowers(prev => [...prev, ...followers]);

      setTotalFollowers(total);
      // console.log("followings", response.data);
    } catch (error) {
      console.error("팔로워 정보를 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  const updateData = () => {
    getFollowings();
    getFollowers(1, page * limit);
  };

  useEffect(() => {
    // console.log("page", page);
    getFollowers(page, limit);
  }, [page]);

  useEffect(() => {
    getFollowings();
    getFollowers(page, limit);
  }, []);

  useEffect(() => {
    setPage(1);
    getFollowers(page, limit);
    // console.log("검색", searchItem);
  }, [searchItem]);

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
        <>
          <S.MyFriendsWrap>
            <S.MyFriends>
              {followers.map((el, idx) => (
                <Person key={`following${idx}`} data={el.user} isMutual={el.isMutual} updateData={updateData} />
              ))}
            </S.MyFriends>
          </S.MyFriendsWrap>
          <S.ShowMoreBtn onClick={handleClick} disabled={followers.length === totalFollowers}>
            목록 더보기
          </S.ShowMoreBtn>
        </>
      )}
    </>
  );
};

export default Followers;
