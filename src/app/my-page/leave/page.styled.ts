import { styled } from "styled-components";
import { flexCenter, flexColumnCenter, flexSpaceBetweenCenter, flexAlignCenter, flexColumn } from "@/styles/common";

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
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;
export const CannotLeaveReasonNotice = styled.div`
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  & > span {
    font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
  }
`;
export const EscapeGuide = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
`;
export const PlanetNotice = styled.div`
  display: flex;
  ${flexCenter}
  gap: 152px;
  padding: 24px 0;
`;
export const Planets = styled.div`
  ${flexColumnCenter}
  gap: 16px;
`;
export const Sort = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
`;
export const Number = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
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
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
  margin-bottom: 8px;
`;
export const NoticeContent = styled.div`
  & > div {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
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
    font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
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
    font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;
export const Button = styled.button`
  padding: 8px 24px;
  color: ${({ theme }) => theme.PALETTE.mainColor};
  background-color: ${({ theme }) => theme.PALETTE.white};
  border: 1px solid ${({ theme }) => theme.PALETTE.mainColor};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
`;
export const FullButton = styled.button`
  padding: 8px 24px;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;
