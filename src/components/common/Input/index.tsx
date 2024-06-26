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
  warning: boolean | string;
  maxLength: number;
  autoComplete: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
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
    onClick,
    disabled,
    readOnly,
    rounded,
    thin,
    warning,
    maxLength,
    autoComplete,
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
      onClick={onClick}
      disabled={disabled}
      readOnly={readOnly}
      ref={ref}
      maxLength={maxLength}
      autoComplete={autoComplete}
    />
  );
});
