import * as S from "./index.styled";

interface InputType {
  name: string;
  id: string;
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type PartialInput = {
  [key in keyof InputType]?: InputType[key];
};

export default function AdjustBtnInput({ name, id, label, placeholder, onChange }: PartialInput) {
  return (
    <>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      <S.AdjustInput>
        <S.MinusButton type="button">-</S.MinusButton>
        <S.Input type="number" id={id} name={name} placeholder={placeholder} onChange={onChange} />
        <S.PlusButton type="button">+</S.PlusButton>
      </S.AdjustInput>
    </>
  );
}
