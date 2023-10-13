import { InputAttr } from "@/@types";
import * as S from "./index.styled";

export default function Radio({
  children,
  value,
  name,
  id,
  defaultChecked,
  checked,
  readOnly,
  disabled,
  onChange,
}: InputAttr) {
  return (
    <label htmlFor={id}>
      <S.Input
        type="radio"
        value={value}
        name={name}
        id={id}
        defaultChecked={defaultChecked}
        disabled={disabled}
        checked={checked}
        readOnly={readOnly}
        onChange={onChange}
      />
      {children}
    </label>
  );
}
