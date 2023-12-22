import * as S from "./index.styled";

export interface sizeProp {
  size: "spaceShip" | "declaration" | "admin" | "post" | "comment" | "planet";
}

export interface TextareaProp extends sizeProp {
  name: string;
  placeholder: string;
  maxLength: number;
  value?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({ size, placeholder, name, maxLength, value, disabled, onChange }: TextareaProp) {
  return (
    <S.Textarea
      size={size}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      name={name}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
