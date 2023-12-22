import { useState } from "react";
import * as S from "./index.styled";

interface PropsType {
  selectList: SelectItem[];
  onSelected: (value: SelectItem) => void;
  selected: SelectItem;
}

export type SelectItem = { value: string; text: string };

export default function SelectBtn({ selectList, selected, onSelected }: PropsType) {
  const [listVisible, setListVisible] = useState<boolean>(false);

  const handleSelect = (li: SelectItem) => {
    onSelected({ value: li.value, text: li.text });
    setListVisible(false);
  };

  return (
    <S.SelectBox>
      <S.Select>
        <p id={selected.value}>{selected.text}</p>
        <button onClick={() => setListVisible(prev => !prev)}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.649414 0.438599L6.83362 6.66828L13.0178 0.438599" stroke="#258EF7" strokeWidth="1.08342" />
          </svg>
        </button>
      </S.Select>
      {listVisible && (
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
