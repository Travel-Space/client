import { styled } from "styled-components";
import {
  bodyContainer,
  flexCenter,
  flexColumnCenter,
  flexSpaceBetweenCenter,
  flexAlignCenter,
  flexColumn,
} from "@/styles/common";

export const Container = styled.div`
  ${bodyContainer}
  padding: 40px 32px 64px;

  width: 952px;
  min-height: 846px;
  margin: 40px auto 64px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;

export const MainTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-weight: 600;
  margin-left: 8px;
  margin-bottom: 16px;
`;
export const Comment = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  margin-left: 8px;
  margin-bottom: 40px;
`;
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
export const EscapeNotice = styled.div`
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
export const Escape = styled.div`
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  margin: 24px 0;
`;
export const Notice = styled.div`
  width: 786px;
  margin: 0 auto;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
  margin-bottom: 8px;
`;
export const NoticeContent = styled.div`
  & > div {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 24px;
  }
`;
export const Period = styled.ul`
  margin: 24px 0;

  & > li::before {
    content: "· ";
  }
  & > li {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 400;
    color: ${({ theme }) => theme.PALETTE.mainColor};

    line-height: 24px;
  }
`;
export const Confirm = styled.div`
  ${flexSpaceBetweenCenter};
  margin-top: 16px;
`;
export const Check = styled.div`
  ${flexAlignCenter}
  gap:8px;

  & > button {
    ${flexAlignCenter}
    background-color: transparent;
  }

  & > span {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 500;
  }
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

export const LeaveButton = styled.div`
  & > button {
    font-weight: 700;
    padding: 9px 24px;
  }
`;
