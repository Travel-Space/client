import { styled } from "styled-components";

export const Container = styled.div`
  width: 280px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  padding-bottom: 16px;
  background-color: ${({ theme }) => theme.PALETTE.white};
`;
