import { Follower } from "@/@types";

import * as S from "./index.styled";

import Image from "next/image";
import Button from "@/components/common/Button";

interface RecommendFriendProps {
  data: Follower;
}
export default function RecommendFriend({ data }: RecommendFriendProps) {
  const handleClick = () => {
    console.log();
  };
  return (
    <S.Container>
      <Image src="/assets/img/icons/default-user.svg" alt="default-user" width={76} height={76} />
      <S.Nickname>{data.user.name}</S.Nickname>
      <S.FollowBtn>
        <Button variant="confirm" shape="medium" size="smallWithXsFont" onClick={handleClick}>
          팔로우
        </Button>
      </S.FollowBtn>
    </S.Container>
  );
}
