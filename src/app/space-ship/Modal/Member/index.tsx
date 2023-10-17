import * as S from "./index.styled";

export default function Member() {
  return (
    <S.Wrap>
      {/* 관리자 위임, 초대 전 일 경우 cursor: pointer */}
      <S.Label>
        <S.ProfileImg src="/assets/img/icons/user-profile-default.svg" />
        <S.InfoGroup>
          <S.NicknameRole>
            <span className="nickname">닉네임</span>
            {/* 관리자 위임 (행성 퇴장) */}
            <span className="role">부관리자</span>
          </S.NicknameRole>
          <S.Email>aaa@email.com</S.Email>
        </S.InfoGroup>
        {/* 관리자 위임 (행성/우주선 퇴장) */}
        <S.Input type="radio" name="member" />
        {/* 행성 멤버 관리 */}
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
      </S.Label>
    </S.Wrap>
  );
}
