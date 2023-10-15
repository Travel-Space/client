import styled from "styled-components";
import { flexAlignCenter, flexColumn, flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div`
  ${flexColumn}
  gap: 16px;
`;

export const Top = styled.div`
  width: 100%;
  ${flexSpaceBetweenCenter}
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

export const Setting = styled.div`
  ${flexAlignCenter}
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  gap: 8px;

  > span {
    cursor: pointer;
  }
`;

export const Role = styled.div`
  color: ${({ theme }) => theme.PALETTE.primary[100]};
`;

export const Middle = styled.div`
  ${flexAlignCenter}
  gap: 24px;

  > img {
    width: 130px;
  }
`;

export const PlanetInfo = styled.div`
  ${flexColumn}
  gap: 8px;

  > strong {
    font-size: ${({ theme }) => theme.FONT_SIZE.em};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.extraBold};
  }

  > span {
    line-height: 1.3;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  }
`;

export const Bottom = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const HashTag = styled.div`
  width: auto;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  background: ${({ theme }) => theme.PALETTE.gray[0]};

  cursor: pointer;
`;
