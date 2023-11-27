import * as S from "./index.styled";
import { createPortal } from "react-dom";

export default function Side({ children, onClick }: { children: React.ReactNode; onClick?: () => {} }) {
  return (
    <S.Background onClick={onClick}>{createPortal(<S.Container>{children}</S.Container>, document.body)}</S.Background>
  );
}
