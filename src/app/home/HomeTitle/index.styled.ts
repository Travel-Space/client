import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 56px;
`;

export const TitleLine = styled.div`
  flex: 1;
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.white};
`;

export const TitleImg = styled.img`
  width: 664px;
  height: 104px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
