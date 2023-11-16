import styled, { css } from "styled-components";

export const Wrap = styled.div`
  height: 424px;
`;

export const Container = styled.div<{ $newShip: boolean }>`
  width: 100%;
  height: 100%;
  background: url("/assets/img/icons/ship-container.svg") no-repeat center / contain;
  position: relative;
  ${({ $newShip }) =>
    $newShip &&
    css`
      filter: brightness(0.5);
      transition: all 0.2s ease-in-out;
      &:hover {
        filter: brightness(1);
      }
    `}
`;

const textStyle = css`
  color: ${({ theme }) => theme.PALETTE.white};
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const Title = styled.p`
  ${textStyle}
  bottom: 144px;
`;

export const MemberCount = styled.span`
  ${textStyle}
  bottom: 80px;
  opacity: 0.6;
`;

export const Img = styled.button`
  background: none;
  outline: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  img {
    transition: all 0.2s ease-in-out;
  }
  &:hover img {
    transform: scale(1.1);
  }
`;
