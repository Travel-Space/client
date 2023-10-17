import { styled } from "styled-components";
import { flexColumnCenter, flexSpaceBetweenCenter, flexAlignCenter } from "@/styles/common";

export const Container = styled.div`
  ${flexColumnCenter}
  gap:20px;

  & > div {
    width: 100%;
  }
`;
export const SummaryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 26px 32px 35px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
`;
export const DropDownWrap = styled.div`
  min-width: 200px;
  max-width: 280px;
`;
export const Planet = styled.div`
  ${flexAlignCenter}
  gap:8px;
  & > span {
    width: 135px;
    font-size: ${({ theme }) => theme.FONT_SIZE.big};
    font-weight: 500;
  }
`;
export const SelectedPlanet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
export const Summary = styled.div`
  display: flex;
  gap: 24px;
`;
export const Number = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-weight: 700;
`;
export const SummaryTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
  margin-bottom: 8px;
`;
export const Statistics = styled.div`
  padding: 28px 40px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
`;
export const Header = styled.div`
  ${flexSpaceBetweenCenter}
  margin-bottom: 16px;
`;
export const Buttons = styled.div`
  display: flex;
  gap: 8px;

  & > button {
    padding: 6px 16px;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 600;
    border-radius: 10px;
  }
`;
export const Button = styled.button`
  color: ${({ theme }) => theme.PALETTE.mainColor};
  background-color: ${({ theme }) => theme.PALETTE.white};
  border: 1px solid ${({ theme }) => theme.PALETTE.mainColor};
`;
export const FullButton = styled.button`
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
`;
export const Today = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-weight: 500;
`;
export const Graph = styled.div`
  height: 308px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;
export const PopularPostingsTable = styled.table`
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
