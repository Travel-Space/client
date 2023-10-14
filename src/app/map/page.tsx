"use client";

import { createPortal } from "react-dom";
import * as S from "./map.styled";

export default function Map({ children }: { children: React.ReactNode }) {
  return (
    <S.Container>
      {createPortal(<S.SideModal>{children}</S.SideModal>, document.body)}
      <div>
        mapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmapmap
      </div>
    </S.Container>
  );
}
