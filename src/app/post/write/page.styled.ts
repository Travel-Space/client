import styled from "styled-components";
import ReactQuill from "react-quill";
import { flexColumnCenter, flexSpaceBetweenCenter } from "@/styles/common";
import "react-quill/dist/quill.snow.css";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
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
    padding: 16px;

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
    padding: 16px;

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
  padding: 24px;
  line-height: 1.42;

  & ol {
    padding-left: 24px;
  }

  & ol > li {
    list-style-type: decimal;
  }

  & ul {
    padding-left: 24px;
  }

  & ul > li {
    list-style-type: disc;
  }

  strong {
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }

  h1 {
    font-size: ${({ theme }) => theme.FONT_SIZE.hg};
  }

  h2 {
    font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  }

  h3 {
    font-size: ${({ theme }) => theme.FONT_SIZE.big};
  }

  img {
    text-align: center;
    width: 100%;
    object-fit: cover;
    margin: 10px 0;
  }

  em,
  i {
    font-style: italic;
  }
  
  a {
  color: ${({ theme }) => theme.PALETTE.mainColor};
  }
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
  ${flexSpaceBetweenCenter}
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
    background-color: ${({ theme }) => theme.PALETTE.primary[100]};
  }
`;

export const QuillWrapper = styled(ReactQuill)`
  background-color: ${({ theme }) => theme.PALETTE.white};
`;
