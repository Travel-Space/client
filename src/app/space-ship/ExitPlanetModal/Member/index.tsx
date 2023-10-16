import * as S from "./index.styled";

export default function Member() {
  return (
    <S.Wrap>
      <S.Label>
        <S.ProfileImg src="/assets/img/icons/user-profile-default.svg" />
        <S.InfoGroup>
          <S.NicknameRole>
            <span className="nickname">닉네임</span>
            <span className="role">부관리자</span>
          </S.NicknameRole>
          <S.Email>aaa@email.com</S.Email>
        </S.InfoGroup>
        <S.Input type="radio" name="member" />
      </S.Label>
    </S.Wrap>
  );
}
