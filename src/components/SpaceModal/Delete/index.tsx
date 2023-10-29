import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Button from "@/components/common/Button";

export enum ItemType {
  SpaceShip = "우주선",
  Planet = "행성",
}

interface Type {
  onClose: () => void;
  title: string | undefined;
  type: ItemType;
}

export default function Delete({ onClose, title, type }: Type) {
  return (
    <BoxModal onClose={onClose} title={`${type} 삭제`}>
      <S.Notification>
        <b>{title}</b>
        <br />
        {type}을 정말로 <b>삭제</b>하시겠습니까?
      </S.Notification>
      <S.CenterGroup>
        <Button variant="reverse" shape="medium" size="big">
          <S.CenterGroup>
            <img src="/assets/img/icons/trash.svg" />
            <span>{type} 삭제하기</span>
          </S.CenterGroup>
        </Button>
        <Button variant="confirm" shape="medium" size="big" onClick={onClose}>
          다시 고민해 볼게요.
        </Button>
      </S.CenterGroup>
    </BoxModal>
  );
}
