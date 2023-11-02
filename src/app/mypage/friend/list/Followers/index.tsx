import { Follower } from "@/@types";

import * as S from "./index.styled";

import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";

interface FollowersProps {
  data: Follower[];
}

export default function Followers({ data }: FollowersProps) {
  return (
    <>
      {data.length === 0 ? (
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
          {data.map((el, idx) => (
            <Person key={`following${idx}`} data={el.user} isMutual={el.isMutual} />
          ))}
        </S.MyFriends>
      )}
    </>
  );
}
