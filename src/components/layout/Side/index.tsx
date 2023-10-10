import * as S from "./index.styled";
import { createPortal } from "react-dom";

export default function Side({ children }: { children: React.ReactNode }) {
  return <S.Background>{createPortal(<S.Container>{children}</S.Container>, document.body)}</S.Background>;
}
