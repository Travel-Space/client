import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import * as S from "./index.styled";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { PlanetContext, PlanetContextType } from "@/components/common/PlanetPage";
import Delete from "@/components/common/SpaceModal/Delete";

import PLANETSHAPE from "@/constants/planetShape";
import VALIDATE from "@/constants/regex";

import { PlanetShape } from "@/@types/Planet";
import { ITEM_TYPE } from "@/@types/Modal";

import { useModal } from "@/hooks/useModal";

import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import PlanetMember from "../Modal/PlanetMember";

const planetImg = Object.entries(PLANETSHAPE).map(([name, src]) => ({ name: name as PlanetShape, src }));

export default function Left() {
  const router = useRouter();
  const { planetInfo, hashtagValid, setPlanetInfo, setHashtagValid, setHashtagCountValid } =
    useContext<PlanetContextType>(PlanetContext);
  const [tagInput, setTagInput] = useState("");
  const { modalDataState, openModal, closeModal } = useModal();
  const user = useRecoilValue(userAtom);

  const [imgPosition, setImgPosition] = useState(planetImg.findIndex(img => img.name === planetInfo.shape) * -100);

  const deleteModal = {
    title: "행성 삭제",
    content: <Delete onClose={closeModal} title={planetInfo.name} type={ITEM_TYPE.PLANET} id={planetInfo.id} />,
  };

  const planetMemberModal = {
    title: "행성 멤버 관리",
    content: <PlanetMember onClose={closeModal} />,
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    VALIDATE.PLANET.HASHTAG.test(e.target.value) ? setHashtagValid(true) : setHashtagValid(false);
  };

  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (!tagInput || !hashtagValid) return;

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
  };

  const deleteTag = (index: number) => {
    const filterTag = planetInfo.hashtags?.filter((_, idx) => idx !== index);
    setPlanetInfo({
      ...planetInfo,
      hashtags: filterTag,
    });
  };

  const calcArrow = (value: number) => {
    const currentIndex = planetImg.findIndex(img => img.name === planetInfo.shape);
    const arrowIndex = (currentIndex + value + planetImg.length) % planetImg.length;
    const arrowShape = planetImg[arrowIndex].name;
    setImgPosition(arrowIndex * -100);

    const newPlanetInfo = {
      ...planetInfo,
      shape: arrowShape,
    };
    setPlanetInfo(newPlanetInfo);
  };

  const prevPlanetImg = () => {
    calcArrow(-1);
  };
  const nextPlanetImg = () => {
    calcArrow(1);
  };

  useEffect(() => {
    setImgPosition(planetImg.findIndex(img => img.name === planetInfo.shape) * -100);
    !planetInfo.hashtags.length ? setHashtagCountValid(false) : setHashtagCountValid(true);
  }, [planetInfo]);

  return (
    <S.Wrap>
      {modalDataState.isOpen && modalDataState.content}
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
      <S.Title>{planetInfo.name ? planetInfo.name : "행성 이름"}</S.Title>
      <S.Group>
        <Input
          type="text"
          name="planet-hashTag"
          id="planet-hashTag"
          placeholder="주제 해시태그 최대 5개"
          onKeyDown={handleTags}
          onChange={handleTagInput}
          value={tagInput}
          warning={!hashtagValid && tagInput}
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
        <S.CenterGroup>
          <Button
            variant="white"
            shape="large"
            size="big"
            onClick={() => router.push(`/planet/${planetInfo.id}/space-ship`)}
          >
            탑승 우주선으로 이동
          </Button>
          {planetInfo.ownerId === user?.id && (
            <>
              <Button variant="gradient" shape="large" size="big" onClick={() => openModal(planetMemberModal)}>
                <S.CenterGroup $gap={20}>
                  <img src="/assets/img/icons/users.svg" />
                  <span>행성 멤버 관리</span>
                </S.CenterGroup>
              </Button>
              <S.DeleteBtn type="button" onClick={() => openModal(deleteModal)}>
                행성 삭제 💥
              </S.DeleteBtn>
            </>
          )}
        </S.CenterGroup>
      )}
    </S.Wrap>
  );
}
