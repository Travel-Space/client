import Image from "next/image";

import * as S from "./index.styled";

import Button from "@/components/common/Button";

export default function MyPostings() {
  const handleClick = () => {
    console.log();
  };
  return (
    <S.Container>
      <S.InfoRow>
        <S.InfoRowCol>
          <S.Planet>지구지구행성</S.Planet>
          <S.Likes>
            <S.Heart>
              <Image src="/assets/img/icons/red-heart.svg" alt="likes" width={10} height={8.61} />
            </S.Heart>
            <span>1,287</span>
          </S.Likes>
        </S.InfoRowCol>
        <S.CreatedDate>2023년 10월 09일 월요일</S.CreatedDate>
      </S.InfoRow>
      <S.InfoRow>
        <S.Title>일본 여행 후쿠오카 온천온천온천 가고싶다!</S.Title>
        <S.Buttons>
          <Button variant="reverse" shape="medium" size="smallWithXsFont" onClick={handleClick}>
            수정
          </Button>
          <Button variant="error" shape="medium" size="smallWithXsFont" onClick={handleClick}>
            삭제
          </Button>
        </S.Buttons>
      </S.InfoRow>
    </S.Container>
  );
}
