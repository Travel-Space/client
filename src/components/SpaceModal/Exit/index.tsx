import BoxModal from "@/components/common/BoxModal";
import Member from "@/components/SpaceModal/Member";
import { Default, ItemType } from "@/@types/Modal";
import Button from "@/components/common/Button";
import * as S from "../index.styled";
import { Role } from "@/@types/Planet";

interface Type extends Default {
  title: string | undefined;
  type: ItemType;
  role?: Role;
}

export default function Exit({ onClose, title, type, role }: Type) {
  return (
    <BoxModal onClose={onClose} title={`${type} 탈출`}>
      {role !== "OWNER" ? (
        <S.Notification>
          <b>{title}</b>
          <br />
          {type}을 정말로 나가시겠습니까?
        </S.Notification>
      ) : (
        <S.Notification>
          <b>{title}</b> {type} 멤버 중 한 명에게 <b>관리자를 위임</b>하시고 <br />
          {type} 나가기 버튼을 눌러주세요.
          <S.MemberList>
            {[1, 2, 3, 4, 5].map(member => (
              <Member key={member} type={type} mode={"select"} />
            ))}
          </S.MemberList>
        </S.Notification>
      )}

      <S.CenterGroup>
        <Button variant="reverse" shape="medium" size="big">
          <S.CenterGroup>
            <img src="/assets/img/icons/exit.svg" />
            <span>{type} 나가기</span>
          </S.CenterGroup>
        </Button>
        <Button variant="confirm" shape="medium" size="big" onClick={onClose}>
          다시 고민해 볼게요.
        </Button>
      </S.CenterGroup>
    </BoxModal>
  );
}
