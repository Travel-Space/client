import styled from "styled-components";
import ReactQuill from "react-quill";
import { flexColumnCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`;

export const WriteSection = styled.div`
  ${flexColumnCenter}
  gap:16px;
  max-height: 1000px;
`;

export const TitleAndPlace = styled.div`
  ${flexColumnCenter}
  gap:16px;

  & input {
    width: 600px;
    height: 48px;
    border-radius: 10px;

    border: none;
    padding: 20px;

    &::placeholder {
      color: ${({ theme }) => theme.PALETTE.gray[100]};
    }
  }
`;

export const TagsAndPlanet = styled.div`
  ${flexSpaceBetweenCenter}
  width: 600px;
  gap: 16px;

  & input {
    width: 600px;
    height: 48px;
    border-radius: 10px;

    border: none;
    padding: 20px;

    &::placeholder {
      color: ${({ theme }) => theme.PALETTE.gray[100]};
    }
  }
`;

export const PreviewSection = styled.div`
  width: 600px;
  height: 1000px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.PALETTE.white};
  margin-bottom: 64px;
  border-radius: 10px;
  padding: 16px;
`;

export const Tags = styled.div`
  padding: 8px 16px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
`;

export const TagsDisplay = styled.div`
  display: flex;
  width: 600px;
  gap: 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  width: 600px;
  background-color: transparent;
`;

export const BackBtn = styled.button`
  padding: 16px 40px;

  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.PALETTE.white};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
  border-radius: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.gray[100]};
  }
`;
export const CompletedBtn = styled.button`
  padding: 16px 40px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
  border-radius: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

export const QuillWrapper = styled(ReactQuill)`

  background-color: ${({ theme }) => theme.PALETTE.white};

&fixed-toolbar-editor .ql-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}


`;
