import { ItemType } from "@/@types/Modal";
import * as S from "./index.styled";
import { User } from "@/@types";
import { Role, RoleName } from "@/@types/Planet";

interface Type {
  mode: "select" | "manage";
  type?: ItemType;
  user: User;
  role: Role;
  onSelectMember: (value: number) => void;
}

export default function Member({ mode, type, user, role, onSelectMember }: Type) {
  const roleName = RoleName[role];

  return (
    <S.Wrap>
      {mode === "select" ? (
        <S.Label>
          <S.ProfileImg src={user.profileImage} />
          <S.InfoGroup>
            <S.NicknameRole>
              <span className="nickname">{user.nickName}</span>
              {type === ItemType.Planet && <span className="role">{roleName}</span>}
            </S.NicknameRole>
            <S.Email>{user.email}</S.Email>
          </S.InfoGroup>
          <S.Input type="radio" name="member" onChange={() => onSelectMember(user.id)} />
        </S.Label>
      ) : (
        <S.MemberWrap>
          <S.ProfileImg src={user.profileImage} />
          <S.InfoGroup>
            <S.NicknameRole>
              <span className="nickname">{user.nickName}</span>
            </S.NicknameRole>
            <S.Email>{user.email}</S.Email>
          </S.InfoGroup>
          <S.Group>
            {/* 초대 전 */}
            {/* <S.Input type="checkbox" name="member" /> */}
            {/* 초대 중 */}
            {/* <S.DisabledButton>초대 중</S.DisabledButton> */}
            {/* 승인 대기 */}
            {/* <S.FillButton>수락</S.FillButton> 
              <S.OutlineButton>거절</S.OutlineButton> */}
            {/* 멤버 권한 관리 */}
            {/* select */}
            {/* <S.FillButton $icons>
                <img src="/assets/img/icons/exit-white.svg" />
              </S.FillButton> */}
          </S.Group>
        </S.MemberWrap>
      )}
    </S.Wrap>
  );
}
