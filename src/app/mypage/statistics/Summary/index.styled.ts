import { styled } from "styled-components";
import { flexAlignCenter } from "@/styles/common";

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
    white-space: nowrap;
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
  height: 43px;
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
