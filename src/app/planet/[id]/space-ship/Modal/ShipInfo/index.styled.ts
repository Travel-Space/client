import { flexAlignCenter, flexCenter, flexColumn, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Content = styled.div`
  ${flexColumn}
  gap:24px;
  padding: 16px 24px 24px;
`;

export const Title = styled.div`
  ${flexSpaceBetweenCenter}
  h2 {
    font-size: ${({ theme }) => theme.FONT_SIZE.big};
    font-weight: 600;
  }
  span {
    border-radius: 100px;
    background: linear-gradient(90deg, #41a0fb 34.77%, #1588fc 100%);
    color: ${({ theme }) => theme.PALETTE.white};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    padding: 8px 16px;
  }
`;

export const Detail = styled.div`
  ${flexColumn}
  gap: 16px;
  div {
    ${flexAlignCenter}
    gap: 16px;
    img {
      width: 24px;
    }
  }
`;

export const DeleteBtn = styled.button`
  width: fit-content;
  background: none;
  color: ${({ theme }) => theme.PALETTE.black};
  font-family: inherit;
  font-size: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.black};
`;

export const CenterGroup = styled.div`
  ${flexCenter}
  gap: 16px;
`;

export const MemberGroup = styled.div``;

export const MemberTitle = styled.div`
  ${flexSpaceBetweenCenter}
  font-weight: 600;
  margin-bottom: 16px;
  span {
    color: #a5a5a5;
  }
`;

export const MemberList = styled.ul`
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  padding: 16px;
  max-height: 160px;
  overflow: scroll;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const Member = styled.li`
  ${flexAlignCenter}
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  gap: 8px;
  img {
    border-radius: 100px;
    object-fit: cover;
    border: 1px solid #d9d9d9;
  }
  div {
    ${flexColumn}
    gap: 2px;
    p:first-child {
      font-weight: 600;
      span {
        font-weight: 400;
        margin-left: 8px;
        color: ${({ theme }) => theme.PALETTE.mainColor};
      }
    }
  }
`;
