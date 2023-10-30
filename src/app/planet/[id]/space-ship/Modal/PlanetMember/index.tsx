import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Member from "@/components/SpaceModal/Member";
import { Default } from "@/@types/Modal";

export default function PlanetMember({ onClose }: Default) {
  return (
    <BoxModal onClose={onClose} title="행성 멤버 관리">
      <S.Notification>
        {/* <S.InputGroup>
          <S.Input placeholder="이메일 또는 닉네임을 검색해보세요." />
          <S.SearchButton>
            <span>검색</span>
            <img src="/assets/img/icons/search.svg" height={16} />
          </S.SearchButton>
        </S.InputGroup> */}

        {/* 친구 없을 때 */}
        {/* <S.NoList>
          <img src="/assets/img/icons/user-profile-default.svg" height={100} />
          <p>
            <b>등록된 친구가 없습니다.</b>
            <br />
            이메일 주소를 입력해보세요.
          </p>
          <S.OutlineButton>친구 관리하기</S.OutlineButton>
        </S.NoList> */}

        {/* 친구 있을 때 */}
        {/* <S.MemberList>
          {[1, 2, 3, 4, 5].map(member => (
            <Member key={member} />
          ))}
        </S.MemberList> */}
      </S.Notification>
      {/* <S.LinkButton>
        <img src="/assets/img/icons/invite.svg" />
        <span>초대하기</span>
      </S.LinkButton> */}
    </BoxModal>
  );
}
