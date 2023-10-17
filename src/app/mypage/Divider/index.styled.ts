import { styled } from "styled-components";

interface DividerProps {
  width?: string;
  height?: string;
}
export const Container = styled.div<DividerProps>`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${({ theme }) => theme.PALETTE.gray[100]};
`;
