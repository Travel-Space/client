import { styled } from "styled-components";
import { flexCenter, flexColumnCenter, flexAlignCenter, flexColumn } from "@/styles/common";

export const CannotLeaveReason = styled.div`
  ${flexColumnCenter}
  gap:24px;
  padding: 20px 0;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;

  & > div {
    ${flexAlignCenter}
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  }
`;
export const CannotLeaveReasonTitle = styled.div`
  gap: 8px;
  font-weight: 700;
`;
export const CannotLeaveReasonNotice = styled.div`
  font-weight: 400;
  & > span {
    font-weight: 600;
  }
`;
export const EscapeGuide = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 400;
`;
export const PlanetNotice = styled.div`
  display: flex;
  ${flexCenter}
  gap: 152px;
  padding: 24px 0;

  & > div:nth-child(2) {
    height: 57px;
  }
`;
export const Planets = styled.div`
  ${flexColumnCenter}
  gap: 16px;
`;
export const Sort = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: 500;
`;
export const Number = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-weight: 500;
`;
export const Escape = styled.div`
  ${flexColumn}
  gap:8px;
  background-color: #f9f9f9;
  padding: 16px 32px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;

  & > div:nth-child(2) {
    justify-content: flex-end;
  }
`;
export const MainContent = styled.div`
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  margin: 24px 0;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;
export const Button = styled.div`
  & > button {
    padding: 8px 24px;
  }
`;
