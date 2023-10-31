import axiosRequest from "@/api";
import { ResData, Follower, Following } from "@/@types";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { followerState, followingState } from "@/recoil/atoms/friend.atom";

import * as S from "./index.styled";

import Button from "@/components/common/Button";

interface FollowBtnProps {
  userId: number;
  isMutual?: boolean;
}
export default function FollowBtn({ userId, isMutual }: FollowBtnProps) {
  const [followState, setFollowState] = useState(isMutual === false ? "unfollowing" : "following");
  const [followers, setFollowers] = useRecoilState(followerState);
  const [followings, setFollowings] = useRecoilState(followingState);

  //팔로우 하기
  async function follow(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Follower[]>>("post", `/user/follow/${userId}`);
      //response로 팔로잉목록 받기 - 수정예정
      // setFollowings(response.data);
      setFollowState("following");
      console.log("follow", response.data);
    } catch (error) {
      alert("팔로우 요청 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error posting follow: ", error);
    }
  }
  //언팔로우 하기
  async function unfollow(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Follower[]>>("delete", `/user/unfollow/${userId}`);
      // console.log("userId", userId);

      //response로 팔로잉목록 받기 - 수정예정
      // setFollowings(response.data);
      setFollowState("unfollowing");
    } catch (error) {
      alert("팔로우 취소 요청 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error posting unfollow: ", error);
    }
  }
  //팔로워 조회
  //response 적용 후 - 수정예정
  async function getFollowers() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Follower[]>>("get", `/user/followers`);
      setFollowers(response.data);
      console.log("followers", response.data);
    } catch (error) {
      alert("팔로워 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followers data: ", error);
    }
  }
  //팔로잉 조회
  //response 적용 후 - 수정예정
  async function getFollowings() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Following[]>>("get", `/user/following`);
      setFollowings(response.data);
      // console.log("followers", response.data);
    } catch (error) {
      alert("팔로잉 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching followings data: ", error);
    }
  }
  const handleClickFollow = async () => {
    await follow(userId);
    getFollowers();
    getFollowings();
  };
  const handleClickUnfollow = async () => {
    await unfollow(userId);
    getFollowings();
    getFollowers();
  };
  return (
    <S.Container>
      {followState === "following" ? (
        <Button variant="reverse" shape="medium" size="smallWithXsFont" onClick={handleClickUnfollow}>
          언팔로우
        </Button>
      ) : (
        <Button variant="confirm" shape="medium" size="smallWithXsFont" onClick={handleClickFollow}>
          팔로우
        </Button>
      )}
    </S.Container>
  );
}
