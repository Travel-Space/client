import { useContext, useState } from "react";

import * as S from "./index.styled";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { PlanetContext, PlanetContextType } from "../page";

export default function Left() {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const planetContext = useContext<PlanetContextType | undefined>(PlanetContext);

  if (!planetContext) {
    return;
  }

  const { planetInfo, setPlanetInfo } = planetContext;

  return (
    <S.Wrap>
      <S.CenterGroup>
        {/* 행성 이미지 목록은 select로 구현 예정 */}
        <S.ArrowLeft type="button">이전</S.ArrowLeft>
        <img src="/assets/img/icons/planet-1.svg" />
        <S.ArrowRight type="button">다음</S.ArrowRight>
      </S.CenterGroup>
      <S.Title>{planetInfo.name}</S.Title>
      <S.Group>
        <Input type="text" name="planet-hashTag" id="planet-hashTag" placeholder="주제 해시태그 최대 5개" />
        <S.TagGroup>
          <S.Tag>
            <span>일본여행</span>
            <button type="button">삭제</button>
          </S.Tag>
          <S.Tag>
            <span>오사카맛집</span>
            <button type="button">삭제</button>
          </S.Tag>
        </S.TagGroup>
      </S.Group>
      {/* 행성 수정 시 */}
      <div>
        {/* <Button variant="gradient" shape="large" size="big">
          탑승 우주선으로 이동
        </Button> */}
        {/* 행성 관리자만 삭제 가능 */}
        {/* <S.DeleteBtn type="button" onClick={() => setShowDeleteModal(true)}>
          행성 삭제 💥
        </S.DeleteBtn> */}
      </div>
      {/* {showDeletePlanetModal ? (
        <DeletePlanetModal onClose={() => setShowDeletePlanetModal(false)} planetTitle="일본 맛도리 여행" />
      ) : null} */}
    </S.Wrap>
  );
}
