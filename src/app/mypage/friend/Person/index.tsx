import Image from "next/image";

import * as S from "./index.styled";

export default function Person() {
  return (
    <S.Container>
      <div>
        <Image src="/assets/img/icons/default-user.svg" alt="planet" width={76} height={76} />
        <S.Info>
          <S.Title>곰숨칭구칭구</S.Title>
          <S.Email>gomsumfriend@email.com</S.Email>
        </S.Info>
      </div>
      <S.AddButton>팔로우</S.AddButton>
    </S.Container>
  );
}
