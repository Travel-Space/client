import { flexAlignCenter, flexCenter, flexColumn, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";
import { OutlineButton as OB, FillButton as FB } from "@/components/Account/common.styled";

export const Content = styled.div`
  ${flexColumn}
  gap:24px;
  padding: 16px 24px 24px;
`;

export const Title = styled.div`
  ${flexSpaceBetweenCenter}
  h2 {
    font-size: ${({ theme }) => theme.FONT_SIZE.big};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
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

export const OutlineButton = styled(OB)`
  ${flexCenter}
  gap: 8px;
  img {
    margin-top: -2px;
  }
`;

export const FillButton = styled(FB)`
  ${flexCenter}
  gap: 8px;
  img {
    margin-top: -2px;
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
