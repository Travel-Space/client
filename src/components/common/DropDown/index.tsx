import { Menu } from "@/@types/DropDown";

import useDetectClose from "@/hooks/useDetectClose";
import { useState, useEffect } from "react";

import Image from "next/image";
import * as S from "./index.styled";

interface DropDownProps {
  shape?: "default" | "medium" | "round";
  font: "sm" | "md" | "lg";
  color?: "black" | "gray" | "none";
  props: Menu;
}
export default function DropDown({ shape, font, color, props }: DropDownProps) {
  const { logo, comment, menuList, selectedMenu, handleClick } = props;
  const [isOpen, dropDownRef, handler] = useDetectClose(false);

  const [isSelected, setIsSelected] = useState(false);
  const selectMenu = (evt: React.MouseEvent) => {
    const eventTarget = evt.target as HTMLElement;
    handleClick(eventTarget.innerText); //메뉴목록에서 클릭한 메뉴를 인자로 받는 메서드
    setIsSelected(true); //메뉴선택 후 글자색 변경
  };
  useEffect(() => {
    comment && handleClick(comment);
  }, []);

  return (
    <S.Container shape={shape} font={font}>
      <S.DropButton onClick={handler} ref={dropDownRef} isDropped={isOpen} color={color}>
        <S.Default comment={!!comment} isSelected={isSelected}>
          {logo && logo}
          {selectedMenu}
        </S.Default>
        <Image src="/assets/img/icons/down.svg" alt="down" width={9} height={9} />
      </S.DropButton>
      <S.MenuList isDropped={isOpen}>
        {menuList.map((el, idx) => (
          <S.Menu key={idx} onClick={selectMenu} color={color}>
            {el}
          </S.Menu>
        ))}
      </S.MenuList>
    </S.Container>
  );
}
