import { flexAlignCenter, flexColumnCenter } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${flexColumnCenter}
  gap: 20px;

  > span {
    font-size: ${({ theme }) => theme.FONT_SIZE.em};
  }
`;

export const ButtonBox = styled.div`
  ${flexAlignCenter}
  gap: 10px;
  width: 200px;
`;
