import styled, { keyframes } from "styled-components";
import { flexColumn, flexSpaceBetweenCenter } from "@/styles/common";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  > a {
    text-decoration: none;
    color: black;
  }

  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  animation: ${fadeIn} 5s ease forwards;

  &:last-child {
    border: none;
  }
`;

export const Post = styled.div`
  ${flexSpaceBetweenCenter}
  gap: 16px;
  padding: 24px 0;
  width: 388px;
`;

export const MainBox = styled.div`
  ${flexColumn}
  gap: 8px;
`;

export const PreviewImg = styled.img`
  width: 110px;
  height: 110px;
`;

export const Description = styled(MainBox)`
  width: 262px;

  > span {
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    width: auto; // 표시할 너비 설정
    height: 16px; // 라인수에 맞춰 길이 정해줘야 함
    overflow: hidden;
    font-weight: 600;
  }

  > div {
    line-height: 1.2;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    width: auto; /* 표시할 너비 설정 */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 라인수 */
    height: 32px; /* 라인수에 맞춰 길이 정해줘야 함 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
`;

export const Date = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;
