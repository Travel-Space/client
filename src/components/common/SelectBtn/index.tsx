import { useState } from "react";
import * as S from "./index.styled";

interface SelectBtnType {
  selectList: ListType[];
  onSelected: (value: ListType) => void;
  selected: ListType;
}

type ListType = { value: string; text: string };

export default function SelectBtn({ selectList, selected, onSelected }: SelectBtnType) {
  const [showList, setShowList] = useState<boolean>(false);

  function handleSelect(li: ListType) {
    onSelected({ value: li.value, text: li.text });
    setShowList(false);
  }

  return (
    <S.SelectBox>
      <S.Select>
        <p id={selected.value}>{selected.text}</p>
        <button onClick={() => setShowList(prev => !prev)}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.649414 0.438599L6.83362 6.66828L13.0178 0.438599" stroke="#258EF7" strokeWidth="1.08342" />
          </svg>
        </button>
      </S.Select>
      {showList && (
        <S.ListGroup>
          {selectList.map((li, index) => (
            <S.List key={index} onClick={() => handleSelect(li)} $selected={li.value === selected.value}>
              {li.text}
            </S.List>
          ))}
        </S.ListGroup>
      )}
    </S.SelectBox>
  );
}
