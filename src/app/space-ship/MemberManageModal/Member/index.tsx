import * as S from "./index.styled";

export default function Member() {
  return (
    <S.Wrap>
      <S.Label>
        <S.ProfileImg src="/assets/img/icons/user-profile-default.svg" />
        <S.InfoGroup>
          <S.NicknameRole>
            <span className="nickname">닉네임</span>
          </S.NicknameRole>
          <S.Email>aaa@email.com</S.Email>
        </S.InfoGroup>
        {/* 초대 전 */}
        {/* <S.Input type="checkbox" name="member" /> */}
        {/* 초대 중 */}

        {/* 승인 대기 */}

        {/* 멤버 권한 관리 */}
      </S.Label>
    </S.Wrap>
  );
}
