import * as S from "./index.styled";

interface ButtonProps {
  variant: "confirm" | "reverse" | "basic" | "gradient" | "error" | "white" | "cancel";
  shape: "small" | "medium" | "large" | "extraLarge";
  size: "smallWithXsFont" | "smallWithSmFont" | "smallWithMdFont" | "normal" | "medium" | "big";
  disabled?: boolean;
  fontWeight?: "bold";
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ variant, shape, size, disabled, fontWeight, children, onClick }: ButtonProps) {
  return (
    <S.Button disabled={disabled} variant={variant} shape={shape} size={size} fontWeight={fontWeight} onClick={onClick}>
      {children}
    </S.Button>
  );
}
