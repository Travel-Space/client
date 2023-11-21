import { useState } from "react";
import * as S from "./index.styled";
import Image from "next/image";

interface CalendarType {
  thisDate: Date;
  onThisDate: (value: Date) => void;
}

export default function Calendar({ thisDate, onThisDate }: CalendarType) {
  const [selectedDate, setSelectedDate] = useState(thisDate);

  const today = new Date();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handleDateClick = (day: number) => {
    const selectedDay = new Date(year, month, day);
    setSelectedDate(selectedDay);
    onThisDate(selectedDay);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(year, month + 1, 1);
    setSelectedDate(nextMonth);
  };

  const goToPrevMonth = () => {
    if (month === today.getMonth() && year === today.getFullYear()) {
      return;
    }
    if (month === today.getMonth() + 1) {
      const lastPrevMonth = new Date(year, month - 1, today.getDate() + 1);
      setSelectedDate(lastPrevMonth);
    } else {
      const prevMonth = new Date(year, month - 1, 1);
      setSelectedDate(prevMonth);
    }
  };

  return (
    <S.CalendarWrap>
      <S.CalendarHeader>
        <button onClick={goToPrevMonth}>
          <Image src="/assets/img/icons/arrow-left.svg" width={10} height={10} alt="이전 달" />
        </button>
        <span>
          {year}년 {month + 1}월
        </span>
        <button onClick={goToNextMonth}>
          <Image src="/assets/img/icons/arrow-right.svg" width={10} height={10} alt="다음 달" />
        </button>
      </S.CalendarHeader>
      <S.CalendarDays>
        {["일", "월", "화", "수", "목", "금", "토"].map(day => (
          <S.DayHeader key={day}>{day}</S.DayHeader>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <S.DayEmpty key={`empty-${i}`} />
        ))}
        {days.map(day => {
          const date = new Date(year, month, day);
          const isPast = date < today;
          return (
            <S.Day
              key={day}
              $selected={selectedDate.getDate() === day}
              onClick={() => !isPast && handleDateClick(day)}
              disabled={isPast}
            >
              {day}
            </S.Day>
          );
        })}
      </S.CalendarDays>
    </S.CalendarWrap>
  );
}
