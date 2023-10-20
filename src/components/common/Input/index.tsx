import * as S from "./index.styled";

interface LabelType {
  id: string;
  children: React.ReactNode;
}

interface InputType {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  disabled: boolean;
  readOnly: boolean;
  rounded: boolean;
  thin: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type PartialInput = {
  [key in keyof InputType]?: InputType[key];
};

export function Label({ id, children }: LabelType) {
  return <S.Label htmlFor={id}>{children}</S.Label>;
}

export default function Input({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  disabled,
  readOnly,
  rounded,
  thin,
}: PartialInput) {
  return (
    <S.Input
      $thin={thin}
      $rounded={rounded}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}
