import Image from "next/image";

import * as S from "./index.styled";
import Button from "@/components/common/Button";

export default function RecommendFriend() {
  const handleClick = () => {
    console.log();
  };
  return (
    <S.Container>
      <Image src="/assets/img/icons/default-user.svg" alt="default-user" width={76} height={76} />
      <S.Nickname>아연짱</S.Nickname>
      <S.FollowBtn>
        <Button variant="confirm" shape="medium" size="smallWithXsFont" onClick={handleClick}>
          팔로우
        </Button>
      </S.FollowBtn>
    </S.Container>
  );
}
