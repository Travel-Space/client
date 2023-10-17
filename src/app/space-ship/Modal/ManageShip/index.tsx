import { ModalType } from "@/@types";
import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import { ButtonGroup, FillButton, OutlineButton } from "@/components/Account/common.styled";

interface Type extends ModalType {}

export default function CreateShipModal({ onClose }: Type) {
  return (
    <BoxModal onClose={onClose} title="새 우주선 만들기">
      <S.Notification></S.Notification>
      <ButtonGroup>
        <OutlineButton>취소</OutlineButton>
        <FillButton>수정 완료</FillButton>
      </ButtonGroup>
    </BoxModal>
  );
}
