import { User } from "@/@types";

import * as S from "./index.styled";

import Image from "next/image";
import Button from "@/components/common/Button";

interface PersonProps {
  data: User;
}
export default function Person({ data }: PersonProps) {
  const handleClick = () => {
    // console.log(data);
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
        <Button variant="confirm" shape="medium" size="smallWithXsFont" onClick={handleClick}>
          팔로우
        </Button>
      </S.FollowBtn>
    </S.Container>
  );
}
