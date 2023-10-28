import useDetectClose from "@/hooks/useDetectClose";

import * as S from "./index.styled";

import Image from "next/image";
import Line from "@/components/common/Line";

interface Select {
  menuList?: string[];
  selectedMenu?: string;
  handleClick?: (menu: string) => void;
  placeholder: string;
}
interface SearchFormProps {
  select: Select;
}

export default function SearchForm({ select }: SearchFormProps) {
  const { menuList, selectedMenu, handleClick, placeholder } = select;
  const [isOpen, dropDownRef, handler] = useDetectClose(false);

  const selectMenu = (evt: React.MouseEvent) => {
    const eventTarget = evt.target as HTMLElement;
    handleClick && handleClick(eventTarget.innerText); //메뉴목록에서 클릭한 메뉴를 인자로 받는 메서드
  };

  return (
    <S.Search>
      {!!menuList && (
        <S.Filter>
          <S.DropButton onClick={handler} ref={dropDownRef} isDropped={isOpen}>
            <S.Default>{selectedMenu}</S.Default>
            <Image src="/assets/img/icons/down.svg" alt="down" width={8} height={8} />
          </S.DropButton>
          <S.MenuList isDropped={isOpen}>
            {menuList.map((el, idx) => (
              <S.Menu key={idx} onClick={selectMenu}>
                {el}
              </S.Menu>
            ))}
          </S.MenuList>
        </S.Filter>
      )}
      {!!menuList && <Line color="gray" size="shortVertical" />}

      <S.SearchInput type="text" placeholder={placeholder} />
      <S.SearchBtn>
        <Image src="/assets/img/icons/search-black.svg" alt="search" width={14} height={14} />
      </S.SearchBtn>
    </S.Search>
  );
}
