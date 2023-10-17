import useDetectClose from "@/hooks/useDetectClose";

import Image from "next/image";
import * as S from "./index.styled";

interface DropDownProps {
  menuList: string[]; //메뉴 목록
  selectedMenu: string; //선택된 메뉴
  handleClick: (menu: string) => void; //클릭시 원하는 기능 적용
}
export default function DropDown({ menuList, selectedMenu, handleClick }: DropDownProps) {
  const [isOpen, dropDownRef, handler] = useDetectClose(false);

  const selectMenu = (evt: React.MouseEvent) => {
    const eventTarget = evt.target as HTMLElement;
    handleClick(eventTarget.innerText); //메뉴 목록에서 클릭한 메뉴를 인자로 받는 메서드
  };

  return (
    <S.Container>
      <S.DropButton onClick={handler} ref={dropDownRef} isDropped={isOpen}>
        <div>{selectedMenu}</div>
        <Image src="/assets/img/icons/down.svg" alt="down" width={9} height={9} />
      </S.DropButton>
      <S.MenuList isDropped={isOpen}>
        {menuList.map((el, idx) => (
          <S.Menu key={idx} onClick={selectMenu}>
            {el}
          </S.Menu>
        ))}
      </S.MenuList>
    </S.Container>
  );
}
