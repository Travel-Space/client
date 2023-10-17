import { flexAlignCenter } from "@/styles/common";
import styled from "styled-components";

export const TabContainer = styled.div`
  width: 100%;
  ${flexAlignCenter}
`;

export const Item = styled.div`
  text-align: center;
  padding: 0 14px 14px;
  flex: 1;

  p {
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
`;
