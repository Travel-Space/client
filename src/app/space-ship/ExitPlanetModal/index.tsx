import { ModalType } from "@/@types";
import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import { ButtonGroup, FillButton } from "@/components/Account/common.styled";
import Member from "../Member";

interface Type extends ModalType {
  planetTitle: string;
}

export default function ExitPlanetModal({ onClose, planetTitle }: Type) {
  return (
    <BoxModal onClick={() => onClose()} title="행성 탈출">
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
      <ButtonGroup>
        <S.OutlineButton>
          <img src="/assets/img/icons/exit.svg" />
          행성 나가기
        </S.OutlineButton>
        <FillButton onClick={() => onClose()}>다시 고민해 볼게요.</FillButton>
      </ButtonGroup>
    </BoxModal>
  );
}
