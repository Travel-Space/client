import { styled } from "styled-components";

export const TableRow = styled.tr`
  & > td {
    padding-bottom: 10px;

    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 400;
  }
`;
export const PostTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: 400;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
export const TdCenter = styled.td`
  text-align: center;
  width: 120px;
`;
export const TdLeft = styled.td`
  text-align: left;
`;
export const Ranking = styled.td`
  width: 24px;
  text-align: center;
  padding-left: 8px;
  padding-right: 20px;
  color: ${({ theme }) => theme.PALETTE.error};
`;
