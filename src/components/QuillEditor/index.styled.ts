import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const QuillWrapper = styled(ReactQuill)`
  position: relative;
  width: 600px;
  height: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  overflow-y: scroll;

  .koCtnE .ql-toolbar.ql-snow {
    position: fixed;
    height: 100%;
  }

  strong {
    font-weight: 700;
  }

  p {
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }

  em,
  i {
    font-style: italic;
  }

  .ql-snow a {
    color: ${({ theme }) => theme.PALETTE.mainColor};
  }

  .ql-snow .ql-editor h1 {
    font-size: ${({ theme }) => theme.FONT_SIZE.hg};
  }

  .ql-snow .ql-editor h2 {
    font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  }

  .ql-snow .ql-editor h3 {
    font-size: ${({ theme }) => theme.FONT_SIZE.big};
  }

  .ql-toolbar.ql-snow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background-color: ${({ theme }) => theme.PALETTE.white};
  }

  .ql-container.ql-snow {
    padding-top: 48px;
  }

  .ql-editor {
    padding: 24px;
    line-height: 1.42;
  }

  img {
    max-width: 100%;
    height: auto; /* 이미지 원본 비율 유지 */
  }

  /* 에디터 내 이미지에 대한 특별한 스타일 */
  .QuillWrapper img {
    text-align: center;
    object-fit: cover;
    float: left;
    margin-right: 8px;
    vertical-align: top;
  }
`;
