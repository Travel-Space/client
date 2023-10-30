import { ItemType } from "@/@types/Modal";
import * as S from "./index.styled";

interface Type {
  mode: "select" | "manage";
  type: ItemType;
}

export default function Member({ mode, type }: Type) {
  return (
    <S.Wrap>
      <S.Label>
        <S.ProfileImg src="/assets/img/icons/user-profile-default.svg" />
        <S.InfoGroup>
          <S.NicknameRole>
            <span className="nickname">닉네임</span>
            {mode === "select" && type === ItemType.Planet && <span className="role">부관리자</span>}
          </S.NicknameRole>
          <S.Email>aaa@email.com</S.Email>
        </S.InfoGroup>
        {mode === "select" ? (
          <S.Input type="radio" name="member" />
        ) : (
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
        )}
      </S.Label>
    </S.Wrap>
  );
}
