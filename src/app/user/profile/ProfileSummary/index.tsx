import * as S from "./index.styled";
import Image from "next/image";

import Line from "@/components/common/Line";
import Button from "@/components/common/Button";

export default function ProfileSummary() {
  const handleClick = () => {
    console.log();
  };
  return (
    <S.Container>
      <S.UserInfo>
        <Image src="/assets/img/icons/default-user.svg" alt="user-img" width={120} height={120} />
        <div>
          <S.Nickname>곰숨곰숨짱</S.Nickname>
          <S.Email>aaaa1234@email.com</S.Email>
          <S.FollowBtn>
            <Button variant="confirm" shape="medium" size="smallWithXsFont" onClick={handleClick}>
              팔로우
            </Button>
          </S.FollowBtn>
        </div>
      </S.UserInfo>
      <S.Friends>
        <S.FollowerNumber>
          <S.Title>팔로워</S.Title>
          <S.Number>102</S.Number>
        </S.FollowerNumber>
        <Line color="gray" size="vertical" />
        <S.FollowingNumber>
          <S.Title>팔로잉</S.Title>
          <S.Number>2888</S.Number>
        </S.FollowingNumber>
      </S.Friends>
    </S.Container>
  );
}
