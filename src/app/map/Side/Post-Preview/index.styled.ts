import { flexAlignCenter, flexCenter, flexColumn } from "@/styles/common";
import styled from "styled-components";

export const Post = styled.div`
  ${flexAlignCenter}
  gap: 16px;
`;

export const MainBox = styled.div`
  ${flexColumn}
  gap: 8px;
`;

export const PreviewImg = styled.img`
  width: 110px;
  height: 110px;
`;

export const Profile = styled.div`
  ${flexAlignCenter}
  gap: 8px;

  > span {
    font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  }

  > img {
    width: 20px;
  }
`;

export const Description = styled.div`
  ${flexColumn}
  gap: 8px;

  > span {
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
  }

  > div {
    line-height: 1.2;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    width: auto; /* 표시할 너비 설정 */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 라인수 */
    height: 32px; /* 라인수에 맞춰 길이 정해줘야함 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
`;

export const Date = styled.div`
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
`;
