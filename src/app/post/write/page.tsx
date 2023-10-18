"use client";

import dynamic from "next/dynamic";
import React from "react";
import * as PW from "./page.styled";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), { ssr: false });

export default function PostWrite() {
  const [value, setValue] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState<string>("");

  //태그 입력 함수
  function handleTagInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTagInput(event.target.value);
  }

  // 태그 입력 시 엔터 가능하게 하는 함수 , 태그는 5개까지만 가능
  function handleTagInputKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && tagInput.trim() !== "" && tags.length < 5) {
      setTags([...tags, tagInput]);
      setTagInput("");
    } else if (tags.length >= 5) {
      alert("태그는 최대 5개까지만 추가할 수 있습니다.");
    }
  }

  // 태그 삭제 버튼 함수
  function handleTagDelete(index: number) {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  }

  return (
    <PW.Wrapper>
      <PW.LeftDisplay>
        <PW.WriteTitleText>게시글 작성</PW.WriteTitleText>
        <PW.WriteSection>
          <PW.TitleAndLocation>
            <PW.TitleInput type="text" placeholder="제목을 입력해주세요" />
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
          <QuillEditor value={value} onChange={setValue} />
          <PW.ButtonGroup>
            <PW.BackBtn>뒤로</PW.BackBtn>
            <PW.CompletedBtn>작성 완료</PW.CompletedBtn>
          </PW.ButtonGroup>
        </PW.WriteSection>
      </PW.LeftDisplay>
      <PW.PreviewSection dangerouslySetInnerHTML={{ __html: value }} aria-readonly />
    </PW.Wrapper>
  );
}
