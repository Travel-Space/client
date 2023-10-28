import * as S from "./index.styled";

import Image from "next/image";
import Button from "@/components/common/Button";

export default function Person() {
  const handleClick = () => {
    console.log();
  };
  return (
    <S.Container>
      <div>
        <Image src="/assets/img/icons/default-user.svg" alt="planet" width={76} height={76} />
        <S.Info>
          <S.Title>곰숨칭구칭구</S.Title>
          <S.Email>gomsumfriend@email.com</S.Email>
        </S.Info>
      </div>
      <S.FollowBtn>
        <Button variant="confirm" shape="medium" size="smallWithXsFont" onClick={handleClick}>
          팔로우
        </Button>
      </S.FollowBtn>
    </S.Container>
  );
}
