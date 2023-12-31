import axiosRequest from "@/api";
import { ResData, Follow } from "@/@types";

import * as S from "./index.styled";

import Button from "@/components/common/Button";

import MESSAGE from "@/constants/message";

interface FollowBtnProps {
  userId: number;
  isMutual?: boolean;
  updateData: () => void;
}
export default function FollowBtn({ userId, isMutual, updateData }: FollowBtnProps) {
  //팔로우 하기
  async function follow(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Follow>>("post", `/user/follow/${userId}`);

      // console.log("follow", response.data);
    } catch (error) {
      console.error("팔로우 요청 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  }
  //언팔로우 하기
  async function unfollow(userId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<Follow>>("delete", `/user/unfollow/${userId}`);
      // console.log("unfollow", response.data);
    } catch (error) {
      console.error("팔로우 취소 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  }

  const handleClickFollow = async () => {
    await follow(userId);
    updateData();
  };

  const handleClickUnfollow = async () => {
    await unfollow(userId);
    updateData();
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
