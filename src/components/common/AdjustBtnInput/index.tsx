import { useEffect, useState } from "react";
import * as S from "./index.styled";

interface InputType {
  name: string;
  id: string;
  value: number;
  min: number;
  max: number;
  onNumber: (value: number) => void;
}

export default function AdjustBtnInput({ name, id, value, min, max, onNumber }: InputType) {
  const [number, setNumber] = useState<number>(value);

  const calcNumber = (newNumber: number) => {
    if (max && newNumber > max) {
      newNumber = max;
    }
    if (min && newNumber < min) {
      newNumber = min;
    }
    return newNumber;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newNumber = Number(e.target.value);

    setNumber(calcNumber(newNumber));
  };

  const handleDirection = (value: number) => {
    setNumber(prev => {
      let newNumber = prev + value;
      return calcNumber(newNumber);
    });
  };

  useEffect(() => {
    onNumber(number);
  }, [number]);

  useEffect(() => {
    setNumber(value);
  }, [value]);

  return (
    <S.AdjustInput>
      <S.MinusButton type="button" onClick={() => handleDirection(-1)} disabled={number === min}>
        증감
      </S.MinusButton>
      <S.Input type="number" id={id} name={name} onChange={handleChange} value={number} min={min} max={max} />
      <S.PlusButton type="button" onClick={() => handleDirection(1)} disabled={number === max}>
        증가
      </S.PlusButton>
    </S.AdjustInput>
  );
}
