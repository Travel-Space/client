import { ModalType } from "@/@types";
import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import {
  ButtonGroup,
  FillButton,
  InputGroup,
  Label,
  OutlineButton,
  TextArea,
} from "@/components/Account/common.styled";
import Input from "@/components/common/Input";
import Line from "@/components/common/Line";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";

interface Type extends ModalType {}

export default function ManageShip({ onClose }: Type) {
  return (
    <BoxModal onClose={onClose} title="새 우주선 만들기">
      <S.Notification>
        <InputGroup>
          <Input label="우주선 이름" />
        </InputGroup>
        <InputGroup>
          <Label>우주선 설명</Label>
          <TextArea $height="96px" />
        </InputGroup>
        <S.Center>
          <S.AdjustBtnGroup>
            <AdjustBtnInput label="인원수" />
          </S.AdjustBtnGroup>
          <S.AdjustBtnGroup>
            <AdjustBtnInput label="탑승 인원수" />
          </S.AdjustBtnGroup>
        </S.Center>
        <S.Center>
          <S.AdjustBtnGroup>
            <AdjustBtnInput label="탑승 인원수" />
          </S.AdjustBtnGroup>
          <S.AdjustBtnGroup>
            <AdjustBtnInput label="탑승 인원수" />
          </S.AdjustBtnGroup>
        </S.Center>
        <S.LineWrap>
          <Line color="gray" />
        </S.LineWrap>
      </S.Notification>
      <ButtonGroup>
        <OutlineButton>취소</OutlineButton>
        <FillButton>작성 완료</FillButton>
      </ButtonGroup>
    </BoxModal>
  );
}
