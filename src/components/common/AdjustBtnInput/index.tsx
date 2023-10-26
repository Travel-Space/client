import { useEffect, useState } from "react";
import * as S from "./index.styled";

interface InputType {
  name: string;
  id: string;
  value: string;
  min: number;
  max: number;
  onNumber: (value: string) => void;
}

export default function AdjustBtnInput({ name, id, value, min, max, onNumber }: InputType) {
  const [number, setNumber] = useState<string>(value);

  function calcNumber(newNumber: number) {
    if (max && newNumber > max) {
      newNumber = max;
    }
    if (min && newNumber < min) {
      newNumber = min;
    }
    return newNumber;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newNumber = parseFloat(e.target.value);

    setNumber(calcNumber(newNumber).toString());
  }

  function handleDirection(value: number) {
    setNumber(prev => {
      const numberPrev = parseFloat(prev);
      let newNumber = numberPrev + value;

      return calcNumber(newNumber).toString();
    });
  }

  useEffect(() => {
    onNumber(number);
  }, [number]);

  return (
    <S.AdjustInput>
      <S.MinusButton type="button" onClick={() => handleDirection(-1)}>
        증감
      </S.MinusButton>
      <S.Input type="number" id={id} name={name} onChange={handleChange} value={number} min={min} max={max} />
      <S.PlusButton type="button" onClick={() => handleDirection(1)}>
        증가
      </S.PlusButton>
    </S.AdjustInput>
  );
}
