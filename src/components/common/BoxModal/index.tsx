import * as S from "./index.styled";
import { createPortal } from "react-dom";

export default function BoxModal({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <S.Background>
      {createPortal(
        <S.Container>
          <S.Header>
            <S.Title>{title}</S.Title>
            <S.CloseBtn onClick={() => onClick()}>닫기</S.CloseBtn>
          </S.Header>
          <S.Body>{children}</S.Body>
        </S.Container>,
        document.body,
      )}
    </S.Background>
  );
}
