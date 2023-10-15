"use client";

import dynamic from "next/dynamic";
import React from "react";
import * as PW from "./page.styled";

const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const mockTags = ["태그1", "태그2", "태그3", "태그4", "태그5"];

export default function PostWrite() {
  const [value, setValue] = React.useState("");

  return (
    <PW.Wrapper>
      <PW.WriteSection>
        <PW.TitleAndPlace>
          <input type="text" placeholder="제목을 입력해주세요" />
          <input type="text" placeholder="위치" />
        </PW.TitleAndPlace>
        <PW.TagsAndPlanet>
          <input type="text" placeholder="태그" />
          <input type="text" placeholder="우주선" />
        </PW.TagsAndPlanet>
        <PW.TagsDisplay>
          {mockTags.map((tag, index) => (
            <PW.Tags key={index}>{tag}</PW.Tags>
          ))}
        </PW.TagsDisplay>
        <QuillEditor value={value} onChange={setValue} />
        <PW.ButtonGroup>
          <PW.BackBtn>뒤로</PW.BackBtn>
          <PW.CompletedBtn>작성완료</PW.CompletedBtn>
        </PW.ButtonGroup>
      </PW.WriteSection>
      <PW.PreviewSection dangerouslySetInnerHTML={{ __html: value }}></PW.PreviewSection>
    </PW.Wrapper>
  );
}
