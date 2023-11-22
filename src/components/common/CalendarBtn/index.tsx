import { useState } from "react";
import * as S from "./index.styled";
import Image from "next/image";
import Calendar from "../Calender";
import getDateFormat from "@/utils/getDateFormat";

interface CalendarBtnType {
  onSelected: (value: string) => void;
  selected: string;
}

export default function CalendarBtn({ onSelected, selected }: CalendarBtnType) {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const handleSelect = (date: Date) => {
    console.log(getDateFormat(date));
    onSelected(getDateFormat(date));
    setShowCalendar(false);
  };

  return (
    <S.SelectBox>
      <S.Select>
        <p>{selected}</p>
        <button onClick={() => setShowCalendar(prev => !prev)}>
          <Image src="/assets/img/icons/calendar.svg" width={16} height={16} alt="" />
        </button>
      </S.Select>
      {showCalendar && <Calendar thisDate={new Date(selected)} onThisDate={date => handleSelect(date)} />}
    </S.SelectBox>
  );
}
