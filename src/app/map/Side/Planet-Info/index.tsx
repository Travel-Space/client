import * as S from "./index.styled";
import Line from "@/components/common/Line";

const HashTag = ["#일본", "#맛집_탐험", "#도쿄_스카이_트리_가자", "#일본_여행_후기_좀", "#일본_후쿠오카_여행갈_사람"];

const Guest = {
  관리자: ["행성 관리", "우주선"],
  게스트: "행성 탑승",
  일반: "우주선",
};

export default function PlanetInfo() {
  return (
    <S.Container>
      <S.Top>
        <S.Setting>
          <span>행성 관리</span> | <span>우주선</span>
        </S.Setting>
        <S.Role>관리자</S.Role>
      </S.Top>

      <S.Middle>
        <img src="/assets/img/icons/planet-1.svg" />
        <S.PlanetInfo>
          <strong>일본 맛도리 여행</strong>
          <Line />
          <span>일본 여행을 가 봅시다. 일본 여행을 가 봅시다. 일본 여행을 가 봅시다. 일본 여행을 가 봅시다.</span>
        </S.PlanetInfo>
      </S.Middle>

      <S.Bottom>
        {HashTag.map(tag => (
          <S.HashTag>{tag}</S.HashTag>
        ))}
      </S.Bottom>
    </S.Container>
  );
}
