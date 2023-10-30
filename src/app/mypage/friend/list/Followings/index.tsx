import { UserFriend } from "@/@types";

import * as S from "./index.styled";

import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";

interface FollowingsProps {
  data: UserFriend[];
}

export default function Followings({ data }: FollowingsProps) {
  return (
    <>
      {!data ? (
        <Nothing
          src="/assets/img/icons/no-friends.svg"
          alt="no-friends"
          width={216}
          height={216}
          comment="등록된 친구가 없습니다."
          suggest="닉네임 또는 계정을 검색해 보세요."
          font="lg"
        />
      ) : (
        <S.MyFriends>
          <Person />
        </S.MyFriends>
      )}
    </>
  );
}
