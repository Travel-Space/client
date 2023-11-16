import { useRecoilValue } from "recoil";

import { userAtom } from "@/recoil/atoms/user.atom";
import { ChatMembership } from "@/@types/Chat";

import * as S from "./index.styled";
import Line from "@/components/common/Line";

export default function Modal(members: { members: ChatMembership[] }) {
  const user = useRecoilValue(userAtom);
  const me = members.members.filter((el: ChatMembership) => el.nickname === user?.nickName);

  return (
    <S.ModalBox>
      <S.Title>
        대화 상대
        <Line size="horizontal" color="gray" />
      </S.Title>

      <S.ProfileBox>
        <S.Profile>
          <img src={me[0]?.profileImage} />
          <span>{me[0]?.nickname} (나)</span>
        </S.Profile>

        <Line size="horizontal" color="gray" />

        {members.members.map((el: ChatMembership) => (
          <S.Profile>
            <img src={el.profileImage} />
            <span>
              {el.nickname}
              {el.role === "OWNER" ? <strong>방장</strong> : ""}
            </span>
          </S.Profile>
        ))}
      </S.ProfileBox>
    </S.ModalBox>
  );
}
