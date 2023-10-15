import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const QuillWrapper = styled(ReactQuill)`
  position: relative;
  width: 600px;
  height: 100%;
  max-height: 700px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  overflow-y: scroll;

  strong {
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
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
`;
