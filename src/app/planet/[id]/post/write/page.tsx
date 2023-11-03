"use client";

import axiosRequest from "@/api";
import MESSAGE from "@/constants/message";
import { PostWrite } from "@/@types/PostWrite";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import * as PW from "./page.styled";
import Button from "@/components/common/Button";
import DropDown from "@/components/common/DropDown";
import LocationInput from "./LocationInput";
import { GeocoderResult } from "@/@types/GeocoderResult";
import { useSearchParams, useRouter } from "next/navigation";
import { Posting, ResData } from "@/@types";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), { ssr: false });

interface PostWriteProps {
  data?: PostWrite;
  id: number;
}

export default function PostWrite({ params }: { params: { id: number } }) {
  const [hashtags, setHashtags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState("우주선");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [planetId, setPlanetId] = React.useState<number>(params.id);
  const [address, setAddress] = React.useState<GeocoderResult>();
  const [locations, setLocation] = React.useState<GeocoderResult>();
  const [published, setPublished] = React.useState<boolean>(true);
  const [isAddressChecked, setIsAddressChecked] = React.useState<boolean>(false);
  const latitude = locations?.geometry?.location.lat;
  const longitude = locations?.geometry?.location.lng;
  const router = useRouter();

  const dropDownProps = {
    //로고 필요할 때만 추가
    logo: (
      <img
        src={selectedMenu !== "우주선" ? "/assets/img/icons/rocket.svg" : "/assets/img/icons/gray-rocket.svg"}
        alt="rocket"
        width={24}
        height={24}
      />
    ),
    comment: "우주선", //미선택시 보여질 문구(필요할 때만 추가)
    menuList: ["가입한 우주선", "가입한 우주선2", "어쩌고 우주선", "우주선우주선"],
    selectedMenu: selectedMenu, //선택한 메뉴를 저장할 변수
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드를 전달
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
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

  const handlePostWrite = async () => {
    try {
      if (!isAddressChecked) {
        alert("주소를 검색 후 선택 버튼을 눌러주세요.");
        return;
      }

      const postData = {
        title,
        content,
        published,
        planetId: Math.round(planetId),
        address,
        locations: [
          {
            latitude,
            longitude,
          },
        ],
        imageUrls: [],
        hashtags,
      };

      const response = await axiosRequest.requestAxios<ResData<PostWriteProps>>("post", "/articles", postData);
      if (response.data && response?.data?.id) {
        // 리디렉션을 여기서 바로 처리
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

  return (
    <PW.Wrapper>
      <PW.LeftDisplay>
        <PW.WriteTitleText>게시글 작성</PW.WriteTitleText>
        <PW.WriteSection>
          <PW.TitleAndLocation>
            <PW.TitleInput
              type="text"
              placeholder="제목을 입력해주세요"
              onChange={handleTitleChange}
              maxLength={50}
              value={title}
            />
            <PW.LocationWrapper>
              <PW.LocationIcon />
              <LocationInput
                placeholder="위치"
                type="text"
                onLocationSelect={handleLocationSelect}
                setIsAddressChecked={setIsAddressChecked}
              />
            </PW.LocationWrapper>
          </PW.TitleAndLocation>
          <PW.TagsAndRocket>
            <PW.TagsInputWrapper>
              <PW.TagIcon />
              <input
                type="text"
                placeholder="태그"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyPress={handleTagInputKeyPress}
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
          <QuillEditor value={content} onChange={setContent} />
          <PW.ButtonGroup>
            <PW.BackBtn>
              <Button variant="cancel" size="big" shape="medium" fontWeight="bold" onClick={handleBack}>
                뒤로
              </Button>
            </PW.BackBtn>
            <PW.CompletedBtn>
              <Button variant="confirm" size="big" shape="medium" fontWeight="bold" onClick={handlePostWrite}>
                작성 완료
              </Button>
            </PW.CompletedBtn>
          </PW.ButtonGroup>
        </PW.WriteSection>
      </PW.LeftDisplay>
      <PW.PreviewSection dangerouslySetInnerHTML={{ __html: content }} aria-readonly />
    </PW.Wrapper>
  );
}
