import { styled } from "styled-components";

export const Table = styled.table`
  width: 100%;
  margin-top: 54px;
`;
export const Tablebody = styled.tbody`
  border-top: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};

  & > tr:nth-child(1) > td {
    padding-top: 14px;
  }
`;
export const TableHeader = styled.thead`
  & > th {
    padding-bottom: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 500;
  }
`;
export const TdCenter = styled.th`
  text-align: center;
  width: 120px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: 500;
`;
export const TdLeft = styled.th`
  text-align: left;
`;
export const TdTitle = styled.th`
  & > div {
    padding-bottom: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    font-weight: 600;
    white-space: nowrap;
  }
`;
export const Title = styled.div`
  margin-top: 54px;
  padding-bottom: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;
