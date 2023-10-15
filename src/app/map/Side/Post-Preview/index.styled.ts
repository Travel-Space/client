import styled from "styled-components";
import { flexAlignCenter, flexColumn } from "@/styles/common";

export const Post = styled.div`
  ${flexAlignCenter}
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid #d9d9d9;

  &:last-child {
    border: none;
  }
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

export const Description = styled(MainBox)`
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
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;
