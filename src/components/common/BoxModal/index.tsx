import * as S from "./index.styled";
import { createPortal } from "react-dom";

interface BoxModalType {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function BoxModal({ children, title, onClose }: BoxModalType) {
  return createPortal(
    <S.Background>
      <S.Container>
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
