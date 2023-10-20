import { ModalType } from "@/@types";
import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Member from "@/components/SpaceModal/Member";

// 삭제 모달, 퇴장 모달 하나로 만들어 쓰기
interface Type extends ModalType {
  planetTitle: string;
}

export default function ExitPlanetModal({ onClose, planetTitle }: Type) {
  return (
    <BoxModal onClose={onClose} title="행성 탈출">
      {/* 부관리자, 일반 멤버 */}
      <S.Notification>
        <b>{planetTitle}</b>
        <br />
        행성을 정말로 나가시겠습니까?
      </S.Notification>
      {/* 관리자 */}
      <S.Notification>
        <b>{planetTitle}</b> 행성 멤버 중 한 명에게 <b>관리자를 위임</b>하시고 <br />
        행성 나가기 버튼을 눌러주세요.
        <S.MemberList>
          {[1, 2, 3, 4, 5].map(member => (
            <Member key={member} />
          ))}
        </S.MemberList>
      </S.Notification>
      {/* <ButtonGroup>
        <S.OutlineButton>
          <img src="/assets/img/icons/exit.svg" />
          행성 나가기
        </S.OutlineButton>
        <FillButton onClick={onClose}>다시 고민해 볼게요.</FillButton>
      </ButtonGroup> */}
    </BoxModal>
  );
}
