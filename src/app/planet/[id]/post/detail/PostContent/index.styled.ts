import { bodyContainer, flexAlignCenter, flexCenter, flexColumnCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  ${bodyContainer}
`;

export const TitleSection = styled.div`
  ${flexSpaceBetweenCenter}
  width: 100%;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.hg};
  font-weight: 600;
  margin-bottom: 24px;
`;

export const Date = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-weight: 400;
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;

export const PostInfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;

export const PostInfo = styled.div`
  ${flexCenter}
  gap: 16px;
`;

export const RocketImg = styled.img`
  ${flexCenter}
  width: 24px;
  height: 24px;
  gap: 8px;
  background-color: transparent;
  background-repeat: no-repeat;
`;

export const PlanetImg = styled.img`
  ${flexCenter}
  width: 24px;
  height: 24px;
  gap: 8px;
  background-color: transparent;
  background-repeat: no-repeat;
`;

export const Content = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;

export const Location = styled.div`
  ${flexAlignCenter}
  margin: 24px 0;
  gap: 8px;
`;

export const LocationImg = styled.img`
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-repeat: no-repeat;
`;

export const Text = styled.div`
  line-height: 1.5;
  margin-bottom: 48px;
`;

export const TextData = styled.div`
  width: 100%;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.PALETTE.white};
  margin: 48px 0 64px;
  border-radius: 10px;
  padding: 24px;
  line-height: 1.42;

  & ol {
    padding-left: 48px;
  }

  & ol > li {
    list-style-type: decimal;
  }

  & ul {
    padding-left: 48px;
  }

  & ul > li {
    list-style-type: disc;
  }

  strong {
    font-weight: 700;
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
    object-fit: cover;
    max-width: 100%;
    float: left;
    margin-right: 8px;
    vertical-align: top;
  }

  em,
  i {
    font-style: italic;
  }

  a {
    color: ${({ theme }) => theme.PALETTE.mainColor};
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-justify {
    text-align: justify;
  }
`;

export const TestImgBox = styled.div`
  ${flexCenter}
  text-align: center;
  margin: 24px 0;
`;

export const TestImg = styled.img`
  width: 500px;
  height: 500px;

  overflow: hidden;
  background-size: cover;
  background-color: transparent;
  background-repeat: no-repeat;
`;

export const TextBottomDisplay = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const Tags = styled.div`
  padding: 8px 16px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
`;

export const TagsDisplay = styled.div`
  display: flex;
  gap: 12px;
`;

export const PostActionBtn = styled.div`
  ${flexSpaceBetweenCenter}
  gap:16px;
`;

export const EditBtn = styled.div`
  width: 104px;
  height: 100%;
`;

export const DeleteBtn = styled.div`
  width: 104px;
  height: 100%;
`;

export const DeclarationBtn = styled.div`
  width: 104px;
  height: 100%;
`;
