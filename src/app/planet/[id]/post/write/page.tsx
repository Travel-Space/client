"use client";

import axiosRequest from "@/api";
import { PostWriteType } from "@/@types/PostWrite";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import * as PW from "./page.styled";
import Button from "@/components/common/Button";
import DropDown from "@/components/common/DropDown";
import LocationInput from "./components/LocationInput";
import { GeocoderResult } from "@/@types/GeocoderResult";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Posting, ResData } from "@/@types";
import { Spaceship } from "@/@types/Spaceship";
import { Menu } from "@/@types/DropDown";
import { PlanetMembership } from "@/@types/Planet";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import Error from "@/app/error";
import Image from "next/image";

const QuillEditor = dynamic(() => import("@/app/planet/[id]/post/write/components/QuillEditor"), { ssr: false });

interface PostWriteProps {
  data?: PostWriteType;
  params: {
    id: number;
  };
  id?: number;
  isEdit?: boolean;
  spaceship?: Spaceship;
  member?: PlanetMembership;
  title?: string;
  content?: string;
  published?: boolean;
  planetId?: number;
  address?: string;
  location?: [{ latitude: number; longitude: number }];
  imageUrls?: [string];
  tags?: string[];
  spaceshipId?: number;
}

export default function PostWrite() {
  const [hashtags, setHashtags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState<string>("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [address, setAddress] = React.useState<GeocoderResult>();
  const [locations, setLocation] = React.useState<GeocoderResult>();
  const [published, setPublished] = React.useState<boolean>(true);
  const [spaceships, setSpaceships] = useState<Spaceship[]>([]);
  const [selectedSpaceshipId, setSelectedSpaceshipId] = useState<number | null>(null);
  const [isAddressChecked, setIsAddressChecked] = React.useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const latitude = locations?.geometry?.location.lat;
  const longitude = locations?.geometry?.location.lng;
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const isEditMode = searchParams.get("isEdit") === "true";
  const router = useRouter();
  const params = useParams();
  const planetIdFromParams = Number(params.id);
  const [planetId, setPlanetId] = React.useState<number>(planetIdFromParams);
  const user = useRecoilValue(userAtom);
  const [hasError, setHasError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const quillEditorRef = useRef();
  const [isDropdownSelected, setIsDropdownSelected] = useState(false); //드롭다운 선택 시 아이콘 변경
  const [isTagInputFocused, setIsTagInputFocused] = useState(false); //태그 아이콘 변경

  // 우주선 목록을 불러오는 함수
  const fetchSpaceships = async (planetId: number, currentSpaceshipId?: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Spaceship>>("get", `/spaceship/by-planet/${planetId}`);
      if (Array.isArray(response.data)) {
        setSpaceships([{ id: null, name: "나 홀로 여행" }, ...response.data]);
        // 현재 게시글의 spaceshipId와 일치하는 우주선이 있는지 확인
        const matchingSpaceship = response.data.find(spaceship => spaceship.id === currentSpaceshipId);
        // 일치하는 우주선이 있으면 해당 ID를 선택된 상태로 설정
        setSelectedSpaceshipId(matchingSpaceship ? matchingSpaceship.id : null);
        console.log(matchingSpaceship);
      } else {
        console.error("받은 데이터가 배열이 아닙니다.");
      }
    } catch (error) {
      console.error("우주선 목록을 불러오는데 실패했습니다.", error);
    }
  };

  //로그인 아닐 시, 행성의 멤버 아닐 시 행성의 지도로 이동시킴
  // 에러 메시지를 직접 에러 컴포넌트에 포함할 예정
  useEffect(() => {
    if (!user?.isAuth) {
      setHasError(true);
      setTimeout(() => {
        alert("로그인이 필요한 페이지입니다.");
        router.push(`/planet/${planetId}/map`);
      }, 1500);
    } else {
      const isMemberOfPlanet = user?.memberships?.planets?.some(
        membership =>
          Number(membership?.planetId) === planetIdFromParams &&
          (membership?.role === "OWNER" || membership?.role === "ADMIN" || membership?.role === "MEMBER"),
      );
      if (!isMemberOfPlanet) {
        setHasError(true);
        setTimeout(() => {
          alert("행성의 멤버만 게시글을 작성할 수 있습니다.");
          router.push(`/planet/${planetId}/map`);
        }, 1500);
      }
    }
  }, [user, planetId, router]);

  if (hasError) {
    return <Error />;
  }

  // 컴포넌트 마운트 시 우주선 목록
  useEffect(() => {
    fetchSpaceships(planetId);
  }, [planetId]);

  // 드롭다운에서 우주선을 선택할 때 호출되는 함수
  const handleDropDownSelect = (menu: string) => {
    if (menu === "나 홀로 여행") {
      setSelectedSpaceshipId(null);
      setIsDropdownSelected(false);
    } else {
      const selectedSpaceship = spaceships.find(spaceship => spaceship.name === menu);
      if (selectedSpaceship) {
        setSelectedSpaceshipId(selectedSpaceship.id);
        setIsDropdownSelected(true);
      } else {
        setSelectedSpaceshipId(null);
        setIsDropdownSelected(false);
      }
    }
  };

  const dropDownProps: Menu = {
    logo: isDropdownSelected ? (
      <Image src="/assets/img/icons/rocket.svg" alt="" width={24} height={24} />
    ) : (
      <Image src="/assets/img/icons/gray-rocket.svg" alt="" width={24} height={24} />
    ),
    menuList: spaceships.map(spaceship => spaceship.name),
    selectedMenu:
      selectedSpaceshipId !== null
        ? spaceships.find(spaceship => spaceship.id === selectedSpaceshipId)?.name || "우주선"
        : "나 홀로 여행",
    handleClick: handleDropDownSelect,
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleTagInputFocus = () => {
    setIsTagInputFocused(true);
  };

  const handleTagInputBlur = () => {
    if (hashtags.length === 0) {
      setIsTagInputFocused(false);
    }
  };

  const handleTagInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagInput.trim() !== "" && hashtags.length < 5) {
      setHashtags([...hashtags, tagInput]);
      setTagInput("");
    } else if (hashtags.length >= 5) {
      alert("태그는 최대 5개까지만 추가할 수 있습니다.");
    }
  };

  const handleTagDelete = (index: number) => {
    const newTags = [...hashtags];
    newTags.splice(index, 1);
    setHashtags(newTags);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleLocationSelect = (address: GeocoderResult, locations: GeocoderResult) => {
    setAddress(address);
    setLocation(locations);
  };

  //게시글 작성 함수
  const handlePostWrite = async () => {
    try {
      if (!isAddressChecked) {
        alert("주소를 검색 후 작성 완료 버튼을 눌러주세요.");
        return;
      }

      const postData = {
        title,
        content,
        published,
        planetId: Math.round(planetId),
        address: address?.formatted_address,
        latitude: latitude,
        longitude: longitude,
        imageUrls: imageUrls.flat(),
        hashtags,
        spaceshipId: selectedSpaceshipId,
      };
      console.log(address);

      const response = await axiosRequest.requestAxios<ResData<PostWriteProps>>("post", "/articles", postData);
      if (response.data && response.data.id && planetId) {
        router.push(`/planet/${planetId}/post?detail=${response.data.id}`);
        alert("게시글 작성에 성공했습니다.");
      } else {
        // id가 없는 경우 에러 처리
        console.error("응답에서 게시글 ID를 찾을 수 없습니다.", response);
        alert("게시글은 생성되었으나, 페이지를 이동할 수 없습니다.");
      }
    } catch (error) {
      console.error("게시글 작성 중 오류가 발생했습니다.", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  //뒤로 가기 버튼
  const handleBack = () => {
    router.back();
  };

  // 수정 모드 시 게시글 데이터 받아오기
  useEffect(() => {
    async function fetchPostData() {
      if (isEditMode && postId) {
        try {
          const response = await axiosRequest.requestAxios<ResData<Posting>>(
            "get",
            `/articles/${postId}?commentPage=1&commentPageSize=10&replyPage=1&replyPageSize=5`,
          );

          if (response.data) {
            const { title, content, hashtags, address, latitude, longitude, spaceshipId } = response.data;
            setTitle(title);
            setContent(content);
            setHashtags(hashtags);

            const locationData: GeocoderResult = {
              formatted_address: address,
              geometry: {
                location: {
                  lat: latitude,
                  lng: longitude,
                },
              },
            };

            setAddress(locationData);
            setLocation(locationData);
            setIsAddressChecked(true);
            fetchSpaceships(planetId, spaceshipId);
          }
        } catch (error) {
          console.error("Error fetching post data:", error);
        }
      }
    }
    fetchPostData();
  }, [postId, isEditMode]);

  //게시글 수정하기
  const handlePostEdit = async () => {
    try {
      if (!isAddressChecked) {
        alert("주소를 검색 후 작성 완료 버튼을 눌러주세요.");
        return;
      }

      // 수정 요청 데이터 준비
      const postData = {
        title,
        content,
        published,
        planetId: Math.round(planetId),
        address: address?.formatted_address,
        latitude: latitude,
        longitude: longitude,
        imageUrls: imageUrls.flat(),
        hashtags,
        spaceshipId: selectedSpaceshipId,
      };
      console.log("Selected spaceship ID:", selectedSpaceshipId);
      console.log("Post data for edit:", postData);

      // 서버로 수정 요청 전송
      const response = await axiosRequest.requestAxios<ResData<PostWriteProps>>(
        "put",
        `/articles/${postId}?replyPageSize=5&commentPageSize=10&commentPage=1`,
        postData,
      );
      if (response.data && response.data.id) {
        // 리디렉션 처리
        router.push(`/planet/${planetId}/post?detail=${response.data.id}`);
        alert("게시글 수정에 성공했습니다.");
      } else {
        console.error("응답에서 게시글 ID를 찾을 수 없습니다.", response);
        alert("게시글은 생성되었으나, 페이지를 이동할 수 없습니다.");
      }
    } catch (error) {
      console.error("게시글 수정 중 오류가 발생했습니다.", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <PW.Wrapper>
      <PW.LeftDisplay>
        <PW.WriteTitleText>게시글 작성</PW.WriteTitleText>
        <PW.WriteSection>
          <PW.TitleAndLocation>
            <PW.TitleInput
              type="text"
              placeholder="제목을 입력해 주세요."
              onChange={handleTitleChange}
              maxLength={50}
              value={title}
            />
            <PW.LocationWrapper>
              <LocationInput
                placeholder="위치"
                type="text"
                onLocationSelect={handleLocationSelect}
                setIsAddressChecked={setIsAddressChecked}
                initialValue={address?.formatted_address}
              />
            </PW.LocationWrapper>
          </PW.TitleAndLocation>
          <PW.TagsAndRocket>
            <PW.TagsInputWrapper>
              <PW.TagIcon isActive={isTagInputFocused || hashtags.length > 0} />
              <input
                type="text"
                placeholder="태그"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyPress={handleTagInputKeyPress}
                onFocus={handleTagInputFocus}
                onBlur={handleTagInputBlur}
              />
            </PW.TagsInputWrapper>
            <PW.RocketInputWrapper>
              <DropDown font="lg" shape="round" color="gray" props={dropDownProps} />
            </PW.RocketInputWrapper>
          </PW.TagsAndRocket>
          <PW.TagsDisplay>
            {hashtags.map((hashtag, index) => (
              <PW.TagWrapper key={index}>
                <PW.Tags>
                  {hashtag}
                  <PW.DeleteTagButton onClick={() => handleTagDelete(index)}>X</PW.DeleteTagButton>
                </PW.Tags>
              </PW.TagWrapper>
            ))}
          </PW.TagsDisplay>
          <QuillEditor
            ref={quillEditorRef}
            value={content}
            onChange={setContent}
            images={imageUrls}
            setImages={setImageUrls}
          />
          <PW.ButtonGroup>
            <PW.BackBtn>
              <Button variant="cancel" size="big" shape="medium" fontWeight="bold" onClick={handleBack}>
                뒤로
              </Button>
            </PW.BackBtn>
            <PW.CompletedBtn>
              {/* 수정 모드 여부에 따라 버튼 변경 */}
              {isEditMode ? (
                <Button variant="confirm" size="big" shape="medium" fontWeight="bold" onClick={handlePostEdit}>
                  수정하기
                </Button>
              ) : (
                <Button variant="confirm" size="big" shape="medium" fontWeight="bold" onClick={handlePostWrite}>
                  작성 완료
                </Button>
              )}
            </PW.CompletedBtn>
          </PW.ButtonGroup>
        </PW.WriteSection>
      </PW.LeftDisplay>
      <PW.PreviewSection dangerouslySetInnerHTML={{ __html: content }} aria-readonly />
    </PW.Wrapper>
  );
}
