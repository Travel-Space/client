import axiosRequest from "@/api";
import { ResData, Follower, Following, User } from "@/@types";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { followerState, followingState } from "@/recoil/atoms/friend.atom";

import * as S from "./index.styled";

import Image from "next/image";
import Button from "@/components/common/Button";

interface PersonProps {
  data: User;
  isMutual?: boolean;
}
export default function Person({ data, isMutual }: PersonProps) {
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
  const handleClickFollow = async (userId: number) => {
    await follow(userId);
    await getFollowers();
    console.log(isMutual);
    getFollowings();
  };
  const handleClickUnfollow = async (userId: number) => {
    await unfollow(userId);
    console.log(isMutual);
    getFollowings();
    getFollowers();
  };
  return (
    <S.Container>
      <div>
        <Image src="/assets/img/icons/default-user.svg" alt="planet" width={76} height={76} />
        <S.Info>
          <S.Name>{data.name}</S.Name>
          <S.Email>{data.email}</S.Email>
        </S.Info>
      </div>
      <S.FollowBtn>
        {followState === "following" ? (
          <Button variant="reverse" shape="medium" size="smallWithXsFont" onClick={() => handleClickUnfollow(data.id)}>
            언팔로우
          </Button>
        ) : (
          <Button variant="confirm" shape="medium" size="smallWithXsFont" onClick={() => handleClickFollow(data.id)}>
            팔로우
          </Button>
        )}
      </S.FollowBtn>
    </S.Container>
  );
}
