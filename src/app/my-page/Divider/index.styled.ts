import { styled } from "styled-components";

export const Container = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.PALETTE.gray[100]};
`;
