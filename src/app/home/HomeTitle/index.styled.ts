import styled from "styled-components";


export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 56px;
`;

export const TitleLine = styled.div`
  flex: 1;
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.white};
`;

export const TitleImg = styled.div`
  width: 664px;
  height: 96px;
  background-color: transparent;
  background-image: url(/assets/img/icons/travelspace.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;