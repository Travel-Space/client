import Image from "next/image";

import * as S from "./index.styled";

export default function RecommendFriend() {
  return (
    <S.Container>
      <Image src="/assets/img/icons/default-user.svg" alt="default-user" width={76} height={76} />
      <S.Nickname>아연짱</S.Nickname>
      <S.FollowBtn>팔로우</S.FollowBtn>
    </S.Container>
  );
}
