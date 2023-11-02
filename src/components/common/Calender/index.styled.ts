import { flexSpaceBetweenCenter } from "@/styles/common";
import styled, { css } from "styled-components";

export const CalendarWrap = styled.div`
  position: absolute;
  top: calc(100% + 1px);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.PALETTE.gray[100]};
  width: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
`;

export const CalendarHeader = styled.div`
  ${flexSpaceBetweenCenter}
  padding: 8px;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.PALETTE.white};
  }
`;

export const CalendarDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  > * {
    text-align: center;
  }
`;

export const DayHeader = styled.div`
  font-size: 12px;
  padding: 8px 0px;
  color: #666;
`;

export const DayEmpty = styled.div`
  color: #666;
`;

export const Day = styled.button<{ $selected: boolean }>`
  padding: 8px 0px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  transition: background-color 0.3s;
  ${({ $selected }) =>
    $selected &&
    css`
      color: ${({ theme }) => theme.PALETTE.mainColor};
      border-bottom: 1px solid ${({ theme }) => theme.PALETTE.mainColor};
    `}
  &:not(:disabled):hover {
    background-color: #f0f0f0;
  }
`;
