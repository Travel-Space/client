import * as S from "./index.styled";

interface ProfileProps {
  // imgSrc: string;
  nickname: string;
  email: string;
}

export default function Profile({ nickname, email }: ProfileProps) {
  return (
    <S.Container>
      {/* <S.UserImg src={imgSrc} alt="" /> */}
      <S.Nickname>{nickname}</S.Nickname>
      <S.Email>{email}</S.Email>
    </S.Container>
  );
}
