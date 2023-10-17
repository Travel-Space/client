import useDetectClose from "@/hooks/useDetectClose";

import Image from "next/image";
import * as S from "./index.styled";
import { useEffect } from "react";

interface Menu {
  logo?: React.ReactNode;
  comment?: string;
  menuList: string[]; //메뉴 목록
  selectedMenu: string; //선택된 메뉴
  handleClick: (menu: string) => void; //클릭시 원하는 기능 적용
}
interface DropDownProps {
  shape?: "default" | "medium" | "round";
  font: "sm" | "md" | "lg";
  color: "black" | "gray";
  props: Menu;
}
export default function DropDown({ shape, font, color, props }: DropDownProps) {
  const { logo, comment, menuList, selectedMenu, handleClick } = props;
  const [isOpen, dropDownRef, handler] = useDetectClose(false);

  const selectMenu = (evt: React.MouseEvent) => {
    const eventTarget = evt.target as HTMLElement;
    handleClick(eventTarget.innerText); //메뉴목록에서 클릭한 메뉴를 인자로 받는 메서드
  };
  useEffect(() => {
    comment && handleClick(comment);
  }, []);

  return (
    <S.Container shape={shape} font={font}>
      <S.DropButton onClick={handler} ref={dropDownRef} isDropped={isOpen} color={color}>
        <S.Default comment={!!comment}>
          {logo && logo}
          {selectedMenu}
        </S.Default>
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
