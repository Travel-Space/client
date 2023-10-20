import { ModalType } from "@/@types";
import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Line from "@/components/common/Line";

interface Type extends ModalType {}

export default function InfoShip({ onClose }: Type) {
  return (
    <BoxModal onClose={onClose} title="우주선 정보">
      <S.Content>
        <S.Title>
          <h2>우리우정뽀에버</h2>
          <span>여행 준비</span>
        </S.Title>
        <Line color="gray" size="horizontal" />
        <S.Detail>
          <div>
            <img src="/assets/img/icons/alert.svg" height={16} />
            <span>여행일정 계획할거에여</span>
          </div>
          <div>
            <img src="/assets/img/icons/calendar.svg" height={16} />
            <span>2023/12/21 ~ 2023/12/27</span>
          </div>
        </S.Detail>
        <Line color="gray" size="horizontal" />
        <S.DeleteBtn>우주선 삭제 💥</S.DeleteBtn>
        {/* <ButtonGroup>
          <S.OutlineButton>
            <img src="/assets/img/icons/exit.svg" />
            퇴장하기
          </S.OutlineButton>
          <S.FillButton>
            <img src="/assets/img/icons/mini-ship.svg" />
            우주선 관리하기
          </S.FillButton>
        </ButtonGroup> */}
      </S.Content>
    </BoxModal>
  );
}
