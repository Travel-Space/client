import { styled } from "styled-components";

export const TableRow = styled.tr`
  & > td {
    padding-bottom: 10px;

    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  }
`;
export const TdCenter = styled.td`
  text-align: center;
  width: 120px;
`;
export const TdLeft = styled.td`
  text-align: left;
  & > div {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  }
`;
export const Ranking = styled.td`
  width: 24px;
  text-align: center;
  padding-left: 8px;
  padding-right: 20px;
  color: ${({ theme }) => theme.PALETTE.error};
`;
