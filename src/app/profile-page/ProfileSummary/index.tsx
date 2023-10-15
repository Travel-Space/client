import * as S from "./index.styled";
import Image from "next/image";

import Divider from "@/app/my-page/Divider";

export default function ProfileSummary() {
  return (
    <S.Container>
      <S.UserInfo>
        <Image src="/assets/img/icons/default-user.svg" alt="user-img" width={120} height={120} />
        <div>
          <S.Nickname>곰숨곰숨짱</S.Nickname>
          <S.Email>aaaa1234@email.com</S.Email>
          <S.AddButton>팔로우</S.AddButton>
        </div>
      </S.UserInfo>
      <S.Friends>
        <S.FollowerNumber>
          <S.Title>팔로워</S.Title>
          <S.Number>102</S.Number>
        </S.FollowerNumber>
        <Divider width="1px" height="43px" />
        <S.FollowingNumber>
          <S.Title>팔로잉</S.Title>
          <S.Number>2888</S.Number>
        </S.FollowingNumber>
      </S.Friends>
    </S.Container>
  );
}
