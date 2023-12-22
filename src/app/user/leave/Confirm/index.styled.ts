import { styled } from "styled-components";
import { flexSpaceBetweenCenter, flexAlignCenter } from "@/styles/common";

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
