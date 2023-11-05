import { useRecoilValue } from "recoil";
import { followerState, totalFollowersState } from "@/recoil/atoms/friend.atom";

import * as S from "./index.styled";

import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";

interface FollowersProps {
  loadData: () => void;
  page: number;
  limit: number;
}

export default function Followers({ loadData, page, limit }: FollowersProps) {
  const followers = useRecoilValue(followerState);
  const totalFollowers = useRecoilValue(totalFollowersState);

  const handleClick = () => {
    loadData();
  };
  return (
    <>
      {followers.length === 0 ? (
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
          {followers.map((el, idx) => (
            <Person key={`following${idx}`} data={el.user} isMutual={el.isMutual} page={page} limit={limit} />
          ))}
          <S.ShowMoreBtn onClick={handleClick} disabled={followers.length === totalFollowers}>
            목록 더보기
          </S.ShowMoreBtn>
        </S.MyFriends>
      )}
    </>
  );
}
