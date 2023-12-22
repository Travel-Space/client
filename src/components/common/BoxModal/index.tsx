import { Default } from "@/@types/Modal";
import * as S from "./index.styled";
import { createPortal } from "react-dom";

interface BoxModalType extends Default {
  children: React.ReactNode;
  title: string;
  depth?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function BoxModal({ children, title, onClose, depth, size }: BoxModalType) {
  return createPortal(
    <S.Background $depth={depth}>
      <S.Container $size={size}>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.CloseBtn onClick={onClose}>닫기</S.CloseBtn>
        </S.Header>
        <S.Body>{children}</S.Body>
      </S.Container>
    </S.Background>,
    document.body,
  );
}
