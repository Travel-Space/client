import * as S from "./index.styled";
import { createPortal } from "react-dom";

export default function Side({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <>
      <S.Background onClick={onClick}></S.Background>
      {createPortal(<S.Container>{children}</S.Container>, document.body)}
    </>
  );
}
