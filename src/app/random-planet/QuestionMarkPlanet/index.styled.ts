import styled, { keyframes } from "styled-components";
import { flexColumnCenter, flexCenter, flexAlignCenter } from "@/styles/common";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

type PlanetNameProps = {
  offset?: boolean;
};

export const Wrapper = styled.div`
  ${flexColumnCenter}
  gap:56px;
  margin-top: 72px;
  text-align: center;

  & a {
    text-decoration: none;
  }
`;

export const PlanetImg = styled.img<{ animate?: boolean }>`
  ${flexCenter}
  width: 240px;
  height: 240px;
  cursor: pointer;
  background-color: transparent;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
  animation: ${props => (props.animate ? rotation : "none")} 2s ease-out;
`;

export const RamdomBtn = styled.div`
  ${flexCenter}
  width: 256px;
  height: 54px;
  border-radius: 40px;
  border: 1px solid ${({ theme }) => theme.PALETTE.white};
  padding: 15px;
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  margin-bottom: 40px;
  text-align: center;
  color: ${({ theme }) => theme.PALETTE.white};
  gap: 16px;
  font-weight: 700;
`;

export const RightArrow = styled.img`
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const PlanetName = styled.div<PlanetNameProps>`
  width: 65%;
  position: absolute;
  top: ${({ offset }) => (offset ? "43%" : "50%")};
  left: ${({ offset }) => (offset ? "60%" : "50%")};
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.PALETTE.white};
  padding: 5px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  cursor: pointer;
`;

export const PlanetImageContainer = styled.div`
  ${flexAlignCenter}
  position: relative;
  min-width: 240px;
  max-width: 240px;

  &:hover ${PlanetImg}:not([data-src="/assets/img/icons/random-planet.svg"]) {
    opacity: 0.7;
  }
`;
