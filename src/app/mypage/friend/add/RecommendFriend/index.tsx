import { Follower } from "@/@types";

import { useRouter } from "next/navigation";

import * as S from "./index.styled";

import Image from "next/image";
import FollowBtn from "../../FollowBtn";

interface RecommendFriendProps {
  data: Follower;
  updateData: () => void;
}
export default function RecommendFriend({ data, updateData }: RecommendFriendProps) {
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/user/profile/${data.userId}`);
  };

  return (
    <S.Container>
      <S.Profile onClick={goToProfile}>
        <Image src="/assets/img/icons/default-user.svg" alt="default-user" width={76} height={76} />
        <S.Nickname>{data.user.nickName}</S.Nickname>
      </S.Profile>
      <FollowBtn userId={data.friendId} isMutual={data.isMutual} updateData={updateData} />
    </S.Container>
  );
}
