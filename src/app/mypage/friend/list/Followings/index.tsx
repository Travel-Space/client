import { useRecoilValue } from "recoil";
import { followingState, totalFollowingsState } from "@/recoil/atoms/friend.atom";

import * as S from "./index.styled";

import Nothing from "@/components/common/Nothing";
import Person from "@/app/mypage/friend/Person";

interface FollowingsProps {
  loadData: () => void;
  updateData: () => void;
}

export default function Followings({ loadData, updateData }: FollowingsProps) {
  const followings = useRecoilValue(followingState);
  const totalFollowings = useRecoilValue(totalFollowingsState);

  //useMoreButton
  const handleClick = () => {
    loadData();
  };

  return (
    <>
      {followings.length === 0 ? (
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
        <>
          <S.MyFriendsWrap>
            <S.MyFriends>
              {followings.map((el, idx) => (
                <Person key={`following${idx}`} data={el.friend} updateData={updateData} />
              ))}
            </S.MyFriends>
            <S.ShowMoreBtn onClick={handleClick} disabled={followings.length === totalFollowings}>
              목록 더보기
            </S.ShowMoreBtn>
          </S.MyFriendsWrap>
        </>
      )}
    </>
  );
}
