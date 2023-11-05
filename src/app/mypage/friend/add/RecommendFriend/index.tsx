import { Follower } from "@/@types";

import * as S from "./index.styled";

import Image from "next/image";
import FollowBtn from "../../FollowBtn";

interface RecommendFriendProps {
  data: Follower;
}
export default function RecommendFriend({ data }: RecommendFriendProps) {
  return (
    <S.Container>
      <Image src="/assets/img/icons/default-user.svg" alt="default-user" width={76} height={76} />
      <S.Nickname>{data.user.name}</S.Nickname>
      <FollowBtn userId={data.userId} isMutual={data.isMutual} page={1} limit={10} />
    </S.Container>
  );
}
