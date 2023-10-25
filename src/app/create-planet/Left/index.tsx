import React, { useContext, useRef, useState } from "react";

import * as S from "./index.styled";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { PlanetContext, PlanetContextType } from "../page";

export default function Left() {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const planetContext = useContext<PlanetContextType | undefined>(PlanetContext);
  const [tagInput, setTagInput] = useState("");

  if (!planetContext) {
    return;
  }

  const { planetInfo, setPlanetInfo } = planetContext;

  function handleTagInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTagInput(e.target.value);
  }

  function handleTags(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing) return;
    if (!tagInput) return;

    const newTag = tagInput.trim().split(" ").join("_");

    if (e.key === "Enter") {
      if (planetInfo.hashtags && planetInfo.hashtags.length < 5) {
        setPlanetInfo({
          ...planetInfo,
          hashtags: [...planetInfo.hashtags, newTag],
        });
      } else {
        alert("최대 5개만 작성 가능합니다.");
      }
      setTagInput("");
    }
  }

  function deleteTag(index: number) {
    const filterTag = planetInfo.hashtags?.filter((_, idx) => idx !== index);
    setPlanetInfo({
      ...planetInfo,
      hashtags: filterTag,
    });
  }

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
        <Input
          type="text"
          name="planet-hashTag"
          id="planet-hashTag"
          placeholder="주제 해시태그 최대 5개"
          onKeyDown={handleTags}
          onChange={handleTagInput}
          value={tagInput}
        />
        <S.TagGroup>
          {planetInfo.hashtags?.map((tag, index) => (
            <S.Tag key={index}>
              <span>{tag}</span>
              <button type="button" onClick={() => deleteTag(index)}>
                삭제
              </button>
            </S.Tag>
          ))}
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
