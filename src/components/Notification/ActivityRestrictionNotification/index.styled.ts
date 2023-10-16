import styled from "styled-components";

export const Container = styled.div`
  width: 256px;

  p {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    line-height: normal;
    margin-bottom: 16px;
  }
  span {
    font-weight: 600;
    line-height: normal;
  }
`;

export const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 8px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  cursor: pointer;
  border-radius: 5px;
  color: ${({ theme }) => theme.PALETTE.white};
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
`;
