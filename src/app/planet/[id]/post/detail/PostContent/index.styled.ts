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
  gap: 8px;
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