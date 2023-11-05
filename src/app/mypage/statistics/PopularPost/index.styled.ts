import { styled } from "styled-components";

export const Table = styled.table`
  width: 100%;
  margin-top: 32px;
`;
export const Tablebody = styled.tbody`
  & > tr:nth-child(1) > td {
    padding-top: 14px;
  }
`;
export const TableHeader = styled.thead`
  margin-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};

  & > th {
    padding-bottom: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 500;
  }
`;
export const TdCenter = styled.th`
  text-align: center;
  width: 120px;
`;
export const TdLeft = styled.th`
  text-align: left;
`;
export const TdTitle = styled.th`
  text-align: center;

  & > div {
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    font-weight: 600;
  }
`;
