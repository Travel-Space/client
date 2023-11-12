import { flexAlignCenter } from "@/styles/common";
import styled from "styled-components";

export const TabContainer = styled.div`
  width: 100%;
  ${flexAlignCenter}
`;

export const Item = styled.div<{ selected: boolean }>`
  text-align: center;
  padding: 0 14px 14px;
  cursor: pointer;
  flex: 1;

  border-bottom: ${props => (props.selected ? "2px solid #000" : "2px solid #D9D9D9")};

  p {
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    color: ${props => (props.selected ? "#000" : "#D9D9D9")};
  }
`;
