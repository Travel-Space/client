import { ModalType } from "@/@types";
import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import { ButtonGroup, FillButton } from "@/components/Account/common.styled";

// 삭제 모달, 퇴장 모달 하나로 만들어 쓰기
interface Type extends ModalType {
  planetTitle: string;
}

export default function DeletePlanetModal({ onClose, planetTitle }: Type) {
  return (
    <BoxModal onClose={onClose} title="행성 삭제">
      <S.Notification>
        <b>{planetTitle}</b>
        <br />
        행성을 정말로 <b>삭제</b>하시겠습니까?
      </S.Notification>
      <ButtonGroup>
        <S.OutlineButton>
          <img src="/assets/img/icons/trash.svg" />
          행성 삭제하기
        </S.OutlineButton>
        <FillButton onClick={onClose}>다시 고민해 볼게요.</FillButton>
      </ButtonGroup>
    </BoxModal>
  );
}
