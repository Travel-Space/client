import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Input from "@/components/common/Input";
import Line from "@/components/common/Line";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";
import { Default } from "@/@types/Modal";

export default function Manage({ onClose }: Default) {
  return (
    <BoxModal onClose={onClose} title="새 우주선 만들기">
      <S.Content>
        <S.Center>
          <S.DefaultImg>
            <label htmlFor="ship-profile-img">
              <img src="/assets/img/icons/ship-profile-default.svg" />
              <S.HoverIcon src="/assets/img/icons/circle-shadow-plus.svg" />
            </label>
            <input type="file" name="ship-profile-img" id="ship-profile-img" />
          </S.DefaultImg>
          <S.Group>{/* <Input label="우주선 이름" /> */}</S.Group>
        </S.Center>
        <S.Group>
          {/* <Label>우주선 설명</Label>
          <TextArea $height="96px" /> */}
        </S.Group>
        <S.Center>
          <S.Group>{/* <AdjustBtnInput label="인원수" /> */}</S.Group>
          <S.Group>{/* 여행 상태 */}</S.Group>
        </S.Center>
        <S.Center>
          <S.BtnInput>
            {/* <Input disabled label="여행 시작일" /> */}
            {/* <S.BtnIcon>
              <img src="/assets/img/icons/calendar.svg" height={12} />
            </S.BtnIcon> */}
          </S.BtnInput>
          <S.BtnInput>
            {/* <Input disabled label="여행 종료일" /> */}
            {/* <S.BtnIcon>
              <img src="/assets/img/icons/calendar.svg" height={12} />
            </S.BtnIcon> */}
          </S.BtnInput>
        </S.Center>
        <Line color="gray" size="horizontal" />
        {/* <ButtonGroup>
          <OutlineButton>취소</OutlineButton>
          <FillButton>작성 완료</FillButton>
        </ButtonGroup> */}
      </S.Content>
    </BoxModal>
  );
}
