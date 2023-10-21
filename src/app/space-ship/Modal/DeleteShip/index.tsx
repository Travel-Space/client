import { ModalType } from "@/@types";
import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";

// 삭제 모달, 퇴장 모달 하나로 만들어 쓰기
interface Type extends ModalType {
  shipTitle: string;
}

export default function DeleteShipModal({ onClose, shipTitle }: Type) {
  return (
    <BoxModal onClose={onClose} title="우주선 삭제">
      <S.Notification>
        <b>{shipTitle}</b>
        <br />
        우주선을 정말로 <b>삭제</b>하시겠습니까?
      </S.Notification>
      {/* <ButtonGroup>
        <S.OutlineButton>
          <img src="/assets/img/icons/trash.svg" />
          우주선 삭제하기
        </S.OutlineButton>
        <FillButton onClick={onClose}>다시 고민해 볼게요.</FillButton>
      </ButtonGroup> */}
    </BoxModal>
  );
}
