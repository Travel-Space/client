import { Follower } from "@/@types";

import * as S from "./index.styled";

import Image from "next/image";
import FollowBtn from "../../FollowBtn";

interface RecommendFriendProps {
  data: Follower;
  updateData: () => void;
}
export default function RecommendFriend({ data, updateData }: RecommendFriendProps) {
  return (
    <S.Container>
      <Image src="/assets/img/icons/default-user.svg" alt="default-user" width={76} height={76} />
      <S.Nickname>{data.user.nickName}</S.Nickname>
      <FollowBtn userId={data.userId} isMutual={data.isMutual} updateData={updateData} />
    </S.Container>
  );
}
