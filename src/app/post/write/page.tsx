"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import * as PW from "./page.styled";
import Button from "@/components/common/Button";
import axios from "axios";
import Input from "@/components/common/Input";
import MESSAGE from "@/constants/message";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), { ssr: false });

interface PostWriteProps {
  title: string;
  content: string;
  published: boolean;
  planetId: number;
}

export default function PostWrite() {
  const [value, setValue] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState<string>("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [planetId, setPlanetId] = React.useState<number>(1);
  const [published, setPublished] = React.useState<boolean>(true);
  //태그 입력 함수
  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  // 태그 입력 시 엔터 가능하게 하는 함수 , 태그는 5개까지만 가능
  const handleTagInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tagInput.trim() !== "" && tags.length < 5) {
      setTags([...tags, tagInput]);
      setTagInput("");
    } else if (tags.length >= 5) {
      alert("태그는 최대 5개까지만 추가할 수 있습니다.");
    }
  };

  // 태그 삭제 버튼 함수
  const handleTagDelete = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const createPost = async () => {
    try {
      const postData = {
        title,
        content,
        planetId,
        published,
      };

      // 헤더에 토큰 추가하기
      const response = await axios.post("/articles", postData);

      if (response.status === 200 || response.status === 201) {
        alert("게시글 작성이 완료되었습니다.");
      }
    } catch (error) {
      console.error("게시글 작성 중 오류가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
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
              placeholder="제목을 입력해주세요"
              onChange={handleTitleChange}
              maxLength={50}
              value={title}
            />
            <PW.LocationWrapper>
              <PW.LocationIcon />
              <PW.LocationInput type="text" placeholder="위치" />
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
              <PW.RocketIcon />
              <input type="text" placeholder="우주선" />
            </PW.RocketInputWrapper>
          </PW.TagsAndRocket>
          <PW.TagsDisplay>
            {tags.map((tag, index) => (
              <PW.TagWrapper key={index}>
                <PW.Tags>
                  {tag}
                  <PW.DeleteTagButton onClick={() => handleTagDelete(index)}>X</PW.DeleteTagButton>
                </PW.Tags>
              </PW.TagWrapper>
            ))}
          </PW.TagsDisplay>
          <QuillEditor value={content} onChange={setContent} />
          <PW.ButtonGroup>
            <PW.BackBtn>
              <Button variant="reverse" size="big" shape="medium">
                뒤로
              </Button>
            </PW.BackBtn>
            <PW.CompletedBtn onClick={createPost}>작성 완료</PW.CompletedBtn>
          </PW.ButtonGroup>
        </PW.WriteSection>
      </PW.LeftDisplay>
      <PW.PreviewSection dangerouslySetInnerHTML={{ __html: content }} aria-readonly />
    </PW.Wrapper>
  );
}
