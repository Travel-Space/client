import React, { useContext, useState } from "react";

import * as S from "./index.styled";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { PlanetContext, PlanetContextType } from "../page";
import PLANETSHAPE from "@/constants/planetShape";
import { PlanetShape } from "@/@types/Planet";
import Image from "next/image";
import { useRouter } from "next/navigation";

const planetImg: {
  name: PlanetShape;
  src: string;
}[] = [
  { name: "SHAPE1", src: PLANETSHAPE.SHAPE1 },
  { name: "SHAPE2", src: PLANETSHAPE.SHAPE2 },
  { name: "SHAPE3", src: PLANETSHAPE.SHAPE3 },
];

export default function Left() {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const planetContext = useContext<PlanetContextType | undefined>(PlanetContext);
  const [tagInput, setTagInput] = useState("");
  const router = useRouter();

  if (!planetContext) {
    return;
  }

  const { planetInfo, setPlanetInfo } = planetContext;
  const [imgPosition, setImgPosition] = useState(planetImg.findIndex(img => img.name === planetInfo.shape) * -100);

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

  function calcArrow(value: number) {
    const currentIndex = planetImg.findIndex(img => img.name === planetInfo.shape);
    const arrowIndex = (currentIndex + value + planetImg.length) % planetImg.length;
    const arrowShape = planetImg[arrowIndex].name;
    setImgPosition(arrowIndex * -100);

    const newPlanetInfo = {
      ...planetInfo,
      shape: arrowShape,
    };
    setPlanetInfo(newPlanetInfo);
  }

  function prevPlanetImg() {
    calcArrow(-1);
  }
  function nextPlanetImg() {
    calcArrow(1);
  }

  return (
    <S.Wrap>
      <S.CenterGroup>
        <S.ArrowLeft type="button" onClick={prevPlanetImg}>
          이전
        </S.ArrowLeft>
        <S.ImageWrap>
          <S.ImageList $left={imgPosition}>
            {planetImg.map(img => (
              <label key={img.name}>
                <input
                  type="radio"
                  name="shape"
                  value={img.name}
                  checked={planetInfo.shape === img.name}
                  onChange={() =>
                    setPlanetInfo({
                      ...planetInfo,
                      shape: img.name,
                    })
                  }
                />
                <Image src={img.src} alt={img.name} width={200} height={200} />
              </label>
            ))}
          </S.ImageList>
        </S.ImageWrap>
        <S.ArrowRight type="button" onClick={nextPlanetImg}>
          다음
        </S.ArrowRight>
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
      {planetInfo.id && (
        <div>
          <Button variant="gradient" shape="large" size="big" onClick={() => router.push("/space-ship")}>
            탑승 우주선으로 이동
          </Button>
          {/* 행성 관리자만 삭제 가능 */}
          {/* <S.DeleteBtn type="button" onClick={() => setShowDeleteModal(true)}>
          행성 삭제 💥
        </S.DeleteBtn> */}
        </div>
      )}
      {/* {showDeletePlanetModal ? (
        <DeletePlanetModal onClose={() => setShowDeletePlanetModal(false)} planetTitle="일본 맛도리 여행" />
      ) : null} */}
    </S.Wrap>
  );
}
