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
  warning: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Label({ id, children }: LabelType) {
  return <S.Label htmlFor={id}>{children}</S.Label>;
}

export default React.forwardRef(function Input(
  {
    type,
    name,
    id,
    placeholder,
    value,
    onChange,
    onKeyDown,
    disabled,
    readOnly,
    rounded,
    thin,
    warning,
  }: Partial<InputType>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <S.Input
      $thin={thin}
      $rounded={rounded}
      $warning={warning}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      readOnly={readOnly}
      ref={ref}
    />
  );
});
