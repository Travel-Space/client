import styled from "styled-components";
import ReactQuill from "react-quill";

export const QuillWrapper = styled(ReactQuill)`
  width: 600px;
  height: 100%;
  max-height: 700px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  overflow-y: scroll;
`;
