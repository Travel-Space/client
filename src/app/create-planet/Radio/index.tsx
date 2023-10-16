import * as S from "./index.styled";

interface InputAttr {
  value: string;
  name: string;
  id: string;
  children?: React.ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

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
  className,
}: InputAttr) {
  return (
    <>
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
        className={className}
      />
      <label htmlFor={id}>{children}</label>
    </>
  );
}
