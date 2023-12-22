import { Follower } from "@/@types";

import { useRouter } from "next/navigation";

import * as S from "./index.styled";

import FollowBtn from "../../FollowBtn";

interface RecommendFriendProps {
  data: Follower;
  updateData: () => void;
}
export default function RecommendFriend({ data, updateData }: RecommendFriendProps) {
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/user/profile/${data.friendId}`);
  };

  return (
    <S.Container>
      <S.Profile onClick={goToProfile}>
        <img src={data.user.profileImage} alt="default-user" />
        <S.Nickname>{data.user.nickName}</S.Nickname>
      </S.Profile>
      <FollowBtn userId={data.user.id} isMutual={data.isMutual} updateData={updateData} />
    </S.Container>
  );
}
