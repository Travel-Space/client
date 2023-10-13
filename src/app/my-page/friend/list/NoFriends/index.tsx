import Image from "next/image";

import * as S from "./index.styled";

export default function NoFriends() {
  return (
    <S.Container>
      <Image src="/assets/img/icons/no-friends.svg" alt="no-friends" width={216} height={216} />
      <S.Explanation>
        <div>등록된 친구가 없습니다.</div>
        <div>닉네임 또는 계정을 검색해 보세요.</div>
      </S.Explanation>
    </S.Container>
  );
}
