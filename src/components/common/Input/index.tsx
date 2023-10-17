import * as S from "./index.styled";

interface InputType {
  type: string;
  name: string;
  id: string;
  label: string;
  placeholder: string;
  disabled: boolean;
  readOnly: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type PartialInput = {
  [key in keyof InputType]?: InputType[key];
};

export default function Input({ type, name, id, label, placeholder, onChange, disabled, readOnly }: PartialInput) {
  return (
    <>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      <S.Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      />
    </>
  );
}
