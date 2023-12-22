import { useState } from "react";
import * as S from "./index.styled";
import Image from "next/image";
import Calendar from "../Calender";
import getDateFormat from "@/utils/getDateFormat";

interface CalendarBtnType {
  onSelected: (value: string) => void;
  selected: string;
  minDate?: string;
}

export default function CalendarBtn({ onSelected, selected, minDate }: CalendarBtnType) {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const handleSelect = (date: Date) => {
    console.log(getDateFormat(date));
    onSelected(getDateFormat(date));
    setShowCalendar(false);
  };

  const isMinDate = minDate ? new Date(minDate) : undefined;

  return (
    <S.SelectBox>
      <S.Select>
        <p>{selected}</p>
        <button onClick={() => setShowCalendar(prev => !prev)}>
          <Image src="/assets/img/icons/calendar.svg" width={16} height={16} alt="" />
        </button>
      </S.Select>
      {showCalendar && (
        <Calendar thisDate={new Date(selected)} minDate={isMinDate} onThisDate={date => handleSelect(date)} />
      )}
    </S.SelectBox>
  );
}
