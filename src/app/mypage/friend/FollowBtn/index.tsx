import axiosRequest from "@/api";
import { ResData, Follower, Following, Follow } from "@/@types";

import { useRecoilState } from "recoil";
import { followerState, followingState } from "@/recoil/atoms/friend.atom";

import * as S from "./index.styled";

import Button from "@/components/common/Button";

interface FollowBtnProps {
  userId: number;
  isMutual?: boolean;
  page: number;
  limit: number;
}
export default function FollowBtn({ userId, isMutual, page, limit }: FollowBtnProps) {
  const [followers, setFollowers] = useRecoilState(followerState);
  const [followings, setFollowings] = useRecoilState(followingState);

  const updateData = (page: number, limit: number) => {
    getFollowings(page, limit);
    getFollowers(page, limit);
  };
  //팔로잉 조회
  async function getFollowings(page: number, limit: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Following[]>>(
        "get",
        `/user/following?page=${page}&limit=${limit}`,
      );
      const followings = response.data;
      if (page === 1) setFollowings(followings);
      else setFollowings(prev => [...prev, ...followings]);
      // console.log("followings", response.data);
    } catch (error) {
      alert("팔로잉 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followings data: ", error);
    }
  }
  //팔로워 조회
  async function getFollowers(page: number, limit: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Follower[]>>(
        "get",
        `/user/followers?page=${page}&limit=${limit}`,
      );
      const followers = response.data;
      if (page === 1) setFollowers(followers);
      else setFollowers(prev => [...prev, ...followers]);
      // console.log("followings", response.data);
    } catch (error) {
      alert("팔로워 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followers data: ", error);
    }
  }
  //팔로우 하기
  async function follow(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Follow>>("post", `/user/follow/${userId}`);

      // console.log("follow", response.data);
    } catch (error) {
      alert("팔로우 요청 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error posting follow: ", error);
    }
  }
  //언팔로우 하기
  async function unfollow(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Follow>>("delete", `/user/unfollow/${userId}`);
      // console.log("unfollow", response.data);
    } catch (error) {
      alert("팔로우 취소 요청 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error posting unfollow: ", error);
    }
  }

  const handleClickFollow = async () => {
    await follow(userId);
    updateData(1, page * limit);
  };
  const handleClickUnfollow = async () => {
    await unfollow(userId);
    updateData(1, page * limit);
  };
  return (
    <S.Container>
      {isMutual === false ? (
        <Button variant="confirm" shape="medium" size="smallWithXsFont" onClick={handleClickFollow}>
          팔로우
        </Button>
      ) : (
        <Button variant="reverse" shape="medium" size="smallWithXsFont" onClick={handleClickUnfollow}>
          언팔로우
        </Button>
      )}
    </S.Container>
  );
}
