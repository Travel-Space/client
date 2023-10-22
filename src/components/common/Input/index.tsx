import React from "react";
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

type PartialInput = Partial<InputType>;

export function Label({ id, children }: LabelType) {
  return <S.Label htmlFor={id}>{children}</S.Label>;
}

export default React.forwardRef(function Input(
  { type, name, id, placeholder, value, onChange, disabled, readOnly, rounded, thin }: PartialInput,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
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
      ref={ref}
    />
  );
});
